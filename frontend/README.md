# Therapiezentrum Horvay Website

A modern, responsive website built with Angular v20 and PrimeNG v20.

## Features

- ✅ Responsive design (mobile-friendly)
- ✅ Sticky header navigation
- ✅ Company color (#94c11c) integrated throughout
- ✅ All required pages and menu items
- ✅ Footer with contact information, hours, and legal links
- ✅ Image placeholders ready for your photos

## Pages

- **Startseite** - Homepage with hero section and service overview
- **Über uns** - About us page
- **Therapien** (submenu):
  - Ergotherapie
  - Feinmotoriktherapie
  - Neurologie
  - Kindertherapie
- **Standorte** - Locations page with both buildings
- **Kontakt** - Contact page with form
- **Impressum** - Legal information
- **Datenschutz** - Privacy policy

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Angular CLI installed globally: `npm install -g @angular/cli`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

### Development Server

Run the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Build the project for production:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Adding Images

Place your images in `public/images/` directory. See `public/images/README.md` for a list of required images.

**Note:** Images in the `public` folder are served from the root URL, so they should be referenced as `images/filename.jpg` in your HTML templates.

## Customization

### Company Color

The company color (#94c11c) is defined as a CSS variable in `src/styles.scss`:
- `--company-color: #94c11c`
- `--company-color-dark: #7aa015`
- `--company-color-light: #b8d85a`

### Styling

- Global styles: `src/styles.scss`
- Shared page styles: `src/app/pages/shared/page-styles.scss`
- Component-specific styles are in each component's `.scss` file

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── layout/          # Main layout with header and footer
│   │   ├── pages/               # All page components
│   │   └── app.ts               # Root component
│   ├── assets/
│   │   └── images/              # Image placeholders
│   └── styles.scss              # Global styles
└── package.json
```

## Technologies Used

- Angular v20
- PrimeNG v20
- PrimeIcons
- SCSS for styling
- Angular Router for navigation

## Notes

- The contact form is currently a placeholder and needs backend integration
- All images are placeholders and should be replaced with actual photos
- Update contact information in the footer and contact pages with your actual details
- Update legal pages (Impressum, Datenschutz) with your actual company information