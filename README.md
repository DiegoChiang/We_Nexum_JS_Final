# Nexum Ingeniería – Sitio Web Informativo

Sitio web estático y responsive desarrollado para **Nexum Ingeniería S.A.C.**, orientado a comunicar de forma clara sus servicios de **Gerencia de Proyectos y Supervisión de Obra**, su portafolio de proyectos y canales de contacto profesional.

Este proyecto forma parte del curso **Programación Web con JavaScript (WE Educación Ejecutiva)**.

---

## 1. Objetivo del proyecto

### Objetivo general

Diseñar e implementar un sitio web informativo y profesional para Nexum Ingeniería que:

- Presente servicios, proyectos, clientes y certificaciones de forma clara.
- Refuerce la propuesta de valor de Nexum frente a potenciales clientes.
- Sirva como base técnica para futuras integraciones con un backend real.

### Objetivos específicos

- Organizar el contenido del brochure institucional en secciones claras: **Inicio**, **Servicios**, **Proyectos** y **Contáctanos**.
- Implementar navegación responsive con menú hamburguesa.
- Desarrollar un portafolio filtrable por sector y tipo de servicio.
- Implementar un formulario de contacto con validaciones en front-end y mensaje de envío simulado.
- Aplicar buenas prácticas de HTML5, CSS3 y JavaScript vanilla.

---

## 2. Tecnologías utilizadas

- **HTML5** – Maquetación semántica de todas las páginas.
- **CSS3** – Estilos globales, layout responsive con Flexbox y Grid.
- **JavaScript (Vanilla)** – Lógica en el lado del cliente:
  - Menú móvil.
  - Tabs o secciones dinámicas en Servicios.
  - Filtros y búsqueda en Proyectos.
  - Carga progresiva de proyectos (ver más).
  - Carrusel de logos.
  - Validación del formulario y simulación de envío.
  - Animaciones suaves al hacer scroll.

No se utilizan frameworks externos ni librerías pesadas.

---

## 3. Estructura del proyecto

Estructura de archivos del repositorio:

```text
.
├─ index.html
├─ pages/servicios.html
├─ pages/proyectos.html
├─ pages/contactanos.html
├─ css/styles.css
└─ js/app.js
```

- `index.html`: Página principal (presentación Nexum, servicios destacados, CTA hacia proyectos y contacto).
- `servicios.html`: Detalle de servicios de gerencia de proyectos, supervisión y consultoría.
- `proyectos.html`: Portafolio de proyectos con filtros por sector/tipo.
- `contactanos.html`: Formulario de contacto con campos validados.
- `styles.css`: Estilos globales del sitio.
- `app.js`: Funcionalidades interactivas y lógica de la UI.
---

## 4. Funcionalidades principales

### 4.1 Navegación y layout

- Header con logo y enlaces a:
  - Inicio
  - Servicios
  - Proyectos
  - Contáctanos
- Menú hamburguesa en dispositivos móviles controlado desde `app.js`.
- Diseño responsive basado en Flexbox y Grid.

### 4.2 Servicios

- Sección estructurada para mostrar servicios clave de Nexum.
- Uso de bloques o pestañas para organizar la información de forma clara.

### 4.3 Proyectos

- Tarjetas de proyectos con:
  - Nombre del proyecto.
  - Cliente.
  - Sector.
  - Tipo de servicio.
- Funcionalidad (implementada en `app.js`) para:
  - Filtrar proyectos por sector/tipo.
  - Buscar por texto.
  - Mostrar más proyectos de forma progresiva.

### 4.4 Contáctanos

- Formulario con campos clave:
  - Datos de contacto.
  - Información del proyecto.
  - Mensaje.
  - Aceptación de términos.
- Validaciones en front-end:
  - Campos obligatorios.
  - Formato de correo.
  - Mensajes de error personalizados.
- Envío simulado:
  - Prevención del envío real.
  - Mensaje de confirmación visible al usuario.

### 4.5 Detalles adicionales

- Carrusel o desplazamiento continuo de logos de clientes (si está activo en la versión final).
- Animaciones on scroll para mejorar la experiencia sin afectar el rendimiento.
- Uso de atributos `alt` en imágenes y metadatos básicos para SEO.

---

## 5. Cómo ejecutar el proyecto

1. Clonar o descargar este repositorio.
2. Mantener todos los archivos en la misma carpeta (o actualizar rutas si se reorganiza).
3. Abrir `index.html` en un navegador web moderno.
4. Navegar entre las distintas secciones usando el menú.

Se recomienda publicar el sitio en un hosting estático (por ejemplo, GitHub Pages).

---

## 6. Limitaciones actuales

- No hay backend ni base de datos integrada.
- El formulario no envía correos reales, solo muestra una confirmación en pantalla.
- El contenido de proyectos es estático y se modifica directamente en el HTML.

Estas limitaciones son consistentes con el alcance definido para este proyecto académico.

---

## 7. Próximos pasos sugeridos

- Conectar el formulario a un servicio de correo o API REST.
- Cargar proyectos desde un archivo JSON o servicio externo.
- Incorporar métricas de analítica web.
- Mejorar accesibilidad (etiquetas ARIA adicionales, contraste, navegación por teclado).
- Optimizar recursos (minificación de CSS/JS, compresión de imágenes).

---

**Autor:** Diego Alonso Chiang Meléndez  
**Proyecto:** Desarrollo de Sitio Web Informativo para Nexum Ingeniería S.A.C.
