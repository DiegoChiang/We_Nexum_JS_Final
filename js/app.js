// ===== Navegación móvil =====
(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const navToggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".site-nav");
  if (!navToggle || !nav) return;

  const setState = (open) => {
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setState(!isOpen);
  });

  // Cierra al hacer clic en un enlace del menú
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      setState(false);
    }
  });

  // Cierra si volvemos a escritorio
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      setState(false);
    }
  });
})();


/* ===== Tabs Servicios ===== */
(() => {
  const tabsRoot = document.querySelector('[data-tabs="servicios"]');
  if (!tabsRoot) return;
  const tabs = Array.from(tabsRoot.querySelectorAll('[role="tab"]'));
  const panels = Array.from(tabsRoot.querySelectorAll('[role="tabpanel"]'));

  const activate = (btn) => {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t === btn)));
    panels.forEach((p) =>
      p.classList.toggle("is-active", "#" + p.id === btn.dataset.tabTarget)
    );
  };

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => activate(btn));
    btn.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(btn);
      if (e.key === "ArrowRight") tabs[(i + 1) % tabs.length].focus();
      if (e.key === "ArrowLeft")
        tabs[(i - 1 + tabs.length) % tabs.length].focus();
    });
  });
})();

/* ===== Carrusel de logos ===== */
(() => {
  const rail = document.querySelector('[data-carousel="clients"]');
  if (!rail) return;

  // Clonar para loop infinito
  const clones = [...rail.children].map((n) => n.cloneNode(true));
  clones.forEach((c) => rail.appendChild(c));

  let rafId = null;
  const speed = 0.5; // px por frame (ajusta a gusto)

  const tick = () => {
    rail.scrollLeft += speed;
    if (rail.scrollLeft >= rail.scrollWidth / 2) rail.scrollLeft = 0; // mitad = original
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!rafId) rafId = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  };

  // Iniciar solo cuando es visible
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? start() : stop()));
      },
      { threshold: 0.1 }
    );
    io.observe(rail);
  } else {
    start();
  }

  // Pausa al pasar el mouse / foco
  rail.addEventListener("mouseenter", stop);
  rail.addEventListener("mouseleave", start);
  rail.addEventListener("focusin", stop);
  rail.addEventListener("focusout", start);
})();

/* ===== Filtros y búsqueda en Proyectos (con filas completas) ===== */
(() => {
  const gallery = document.querySelector('[data-gallery="proyectos"]');
  if (!gallery) return;

  const searchInput = document.querySelector("[data-search]");
  const loadMoreBtn = document.querySelector("[data-load-more]");
  const items = Array.from(gallery.querySelectorAll(".project-card"));

  const state = { sectores: new Set(), servicios: new Set(), query: "" };
  const normalize = (s) =>
    (s || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const BATCH = 9;
  let visibleCount = BATCH;

  // Contador resultados
  let countEl = document.querySelector(".results-count");
  if (!countEl) {
    countEl = document.createElement("p");
    countEl.className = "small results-count";
    const filters = document.querySelector(".filters");
    if (filters) filters.appendChild(countEl);
  }

  // Nº de columnas reales del grid
  const getCols = () => {
    const t = getComputedStyle(gallery).gridTemplateColumns;
    let cols = t.split(" ").filter((s) => /fr$|px$/.test(s)).length;
    if (!cols) cols = Math.max(1, Math.round(gallery.clientWidth / 300)); // fallback
    return cols;
  };

  // Redondea para mostrar filas completas
  const snapToRows = (n, total) => {
    const cols = getCols();
    const snapped = Math.min(Math.ceil(n / cols) * cols, total);
    return Math.max(snapped, Math.min(cols, total));
  };

  const applyFilters = () => {
    const q = normalize(state.query);

    // Marca keep / discard
    const kept = [];
    items.forEach((card) => {
      const sector = card.dataset.sector || "";
      const servicio = card.dataset.servicio || "";
      const text = card.textContent || "";

      const matchSector = state.sectores.size
        ? state.sectores.has(sector)
        : true;
      const matchServicio = state.servicios.size
        ? state.servicios.has(servicio)
        : true;
      const matchQuery = q ? normalize(text).includes(q) : true;

      const keep = matchSector && matchServicio && matchQuery;
      card.dataset.keep = keep ? "1" : "0";
      if (keep) kept.push(card);
    });

    const total = kept.length;
    const limit = snapToRows(visibleCount, total);

    // Mostrar solo hasta "limit" y ocultar el resto
    let i = 0;
    items.forEach((card) => {
      if (card.dataset.keep === "1") {
        card.hidden = i >= limit;
        i++;
      } else {
        card.hidden = true;
      }
    });

    countEl.textContent = `Mostrando ${limit} de ${total}`;
    if (loadMoreBtn) loadMoreBtn.style.display = total > limit ? "" : "none";
  };

  // Chips de filtros
  document.querySelectorAll(".pills [data-filter]").forEach((btn) => {
    const group = btn.getAttribute("data-filter");
    const value = btn.getAttribute("data-value");
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => {
      const set = group === "sector" ? state.sectores : state.servicios;
      if (set.has(value)) {
        set.delete(value);
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      } else {
        set.add(value);
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      }
      visibleCount = BATCH;
      applyFilters();
    });
  });

  // Búsqueda
  if (searchInput) {
    let t;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(t);
      t = setTimeout(() => {
        state.query = e.target.value || "";
        visibleCount = BATCH;
        applyFilters();
      }, 200);
    });
  }

  // Cargar más (y ajustar a filas completas)
  loadMoreBtn &&
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += BATCH;
      applyFilters();
    });

  // Recalcular al cambiar el ancho (nº de columnas)
  window.addEventListener("resize", () => applyFilters());

  // Init
  items.forEach((i) => {
    i.hidden = false;
    i.dataset.keep = "1";
  });
  applyFilters();
})();

/* ===== Validación y envío simulado (Contáctanos) ===== */
(() => {
  const form = document.querySelector('[data-form="contacto"]');
  if (!form) return;

  const success = form.querySelector(".form-success");
  const servicio  = form.elements["servicio"];
  const sector    = form.elements["sector"];
  const ubicacion = form.elements["ubicacion"];
  const presupuesto = form.elements["presupuesto"];
  const nombre   = form.elements["nombre"];
  const email    = form.elements["email"];
  const telefono = form.elements["telefono"];
  const mensaje  = form.elements["mensaje"];
  const consent  = form.elements["consent"];

  // Limpia mensaje personalizado al escribir/cambiar
  form.addEventListener("input", (e) => {
    if (e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement) {
      e.target.setCustomValidity("");
    }
  });
  form.addEventListener("change", (e) => {
    if (e.target === consent) {
      consent.setCustomValidity("");
    }
  });

  const validate = () => {
    let ok = true;

    // Reiniciar mensajes
    [servicio, sector, ubicacion, presupuesto,
     nombre, email, telefono, mensaje, consent].forEach((f) => {
      if (f && "setCustomValidity" in f) f.setCustomValidity("");
    });

    if (servicio && !servicio.value) {
      servicio.setCustomValidity("Selecciona el tipo de servicio.");
      ok = false;
    }

    if (sector && !sector.value) {
      sector.setCustomValidity("Selecciona el sector del proyecto.");
      ok = false;
    }

    if (ubicacion && ubicacion.value.trim().length < 3) {
      ubicacion.setCustomValidity("Indica una ubicación válida (distrito/ciudad).");
      ok = false;
    }

    if (nombre && nombre.value.trim().length < 3) {
      nombre.setCustomValidity("Ingresa tu nombre y apellido.");
      ok = false;
    }

    if (email && email.value.trim() && !email.checkValidity()) {
      // checkValidity ya sabe que es type="email"
      email.setCustomValidity("Ingresa un correo electrónico válido.");
      ok = false;
    }

    if (telefono && telefono.value.trim() &&
        !/^[0-9+\s()-]{6,}$/.test(telefono.value.trim())) {
      telefono.setCustomValidity(
        "Ingresa un teléfono válido (mínimo 6 caracteres, solo números, espacios, + o guiones)."
      );
      ok = false;
    }

    if (mensaje && mensaje.value.trim().length < 10) {
      mensaje.setCustomValidity(
        "Cuéntanos brevemente el alcance del proyecto (mínimo 10 caracteres)."
      );
      ok = false;
    }

    if (consent && !consent.checked) {
      consent.setCustomValidity("Debes aceptar el uso de tus datos para continuar.");
      ok = false;
    }

    return ok;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = validate() && form.checkValidity();

    if (!isValid) {
      form.reportValidity();
      return;
    }

    // Simular envío OK
    setTimeout(() => {
      success.hidden = false;
      form.reset();

      // Scroll al mensaje de éxito
      const header = document.querySelector(".site-header");
      const extra = 90;
      const offset = (header ? header.offsetHeight : 0) + extra;
      const target = success || form;
      const y =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }, 250);
  });
})();


/* ===== Reveal on scroll ===== */
(() => {
  const roots = document.querySelectorAll('[data-reveal="scroll"]');
  if (!roots.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        e.target.classList.toggle("in-view", e.isIntersecting);
        if (e.isIntersecting) io.unobserve(e.target);
      });
    },
    { threshold: 0.15 }
  );
  roots.forEach((r) => io.observe(r));
})();
