# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a replica/clone of the NET-ESPAÑA website (netespana.org), created for hosting on GitHub. NET-ESPAÑA is the Spanish Association of Neuroendocrine Tumor Patients (Asociación de Pacientes con Tumores Neuroendocrinos). The site is entirely in Spanish.

## Development

This is a static website with no build system. To develop:

- Open `index.html` in a browser, or use a local server:
  ```bash
  python3 -m http.server 8000
  ```
- No compilation, transpilation, or package manager required

## Architecture

### File Structure

- `index.html` - Homepage
- `css/styles.css` - All styles using CSS variables and BEM methodology
- `js/main.js` - Vanilla JavaScript for interactivity
- Content pages organized by section:
  - `acerca/` - About pages (objective, zebra symbol, team, medical committee)
  - `tumores-neuroendocrinos/` - Medical information pages
  - `actividades-y-eventos/` - Events listing
  - `saber-mas/` - Resources (guides, treatments, presentations)
  - `asesoramiento/` - Advisory services
  - `contacto/` - Contact page
  - `testimonios/` - Patient testimonials
- `images/` - Static assets (logo, banners, events, partners, slider)

### CSS Architecture

- CSS variables defined in `:root` for colors, typography, spacing, and layout
- BEM naming convention: `.block__element--modifier`
- Primary color: `#00a651` (green)
- Font: Open Sans from Google Fonts
- Mobile-first responsive design with 768px breakpoint

### JavaScript

- Vanilla JS, no frameworks
- External dependency: Swiper.js (CDN) for hero slider
- Font Awesome (CDN) for icons
- Main functionality:
  - Mobile navigation toggle
  - Cookie consent banner (localStorage)
  - Dropdown menus
  - Video modal for Vimeo embeds
  - Contact form validation

### Navigation Structure

The navigation uses dropdown menus with `.nav__item--has-dropdown` class. Each internal page follows the same header/footer template pattern.
