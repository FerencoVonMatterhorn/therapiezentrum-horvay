import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/startseite/startseite').then(m => m.Startseite),
    title: 'Ergotherapie Aschersleben & Staßfurt | Therapiezentrum Horvay',
    data: {
      description:
        'Ergotherapie in Aschersleben und Staßfurt: Feinmotoriktherapie, Neurologie und Kindertherapie im Therapiezentrum Horvay. Jetzt Termin vereinbaren.'
    }
  },
  {
    path: 'ueber-uns',
    loadComponent: () => import('./pages/ueber-uns/ueber-uns').then(m => m.UeberUns),
    title: 'Über uns | Therapiezentrum Horvay Aschersleben & Staßfurt',
    data: {
      description:
        'Lernen Sie das Team des Therapiezentrums Horvay kennen – Ihre Praxis für Ergotherapie in Aschersleben und Staßfurt.'
    }
  },
  {
    path: 'ergotherapie',
    loadComponent: () => import('./pages/ergotherapie/ergotherapie').then(m => m.Ergotherapie),
    title: 'Ergotherapie in Aschersleben & Staßfurt | Horvay',
    data: {
      description:
        'Ergotherapie in Aschersleben und Staßfurt: Wir stellen Ihre Handlungsfähigkeit im Alltag wieder her. Termine unter 03473 802660.'
    }
  },
  {
    path: 'feinmotoriktherapie',
    loadComponent: () =>
      import('./pages/feinmotoriktherapie/feinmotoriktherapie').then(m => m.Feinmotoriktherapie),
    title: 'Feinmotoriktherapie Aschersleben & Staßfurt | Horvay',
    data: {
      description:
        'Feinmotoriktherapie in Aschersleben und Staßfurt – gezielte Förderung von Hand- und Fingerbeweglichkeit für Kinder und Erwachsene.'
    }
  },
  {
    path: 'neurologie',
    loadComponent: () => import('./pages/neurologie/neurologie').then(m => m.Neurologie),
    title: 'Neurologische Ergotherapie Aschersleben & Staßfurt | Horvay',
    data: {
      description:
        'Neurologische Ergotherapie in Aschersleben und Staßfurt: Rehabilitation nach Schlaganfall, Multipler Sklerose, Parkinson und weiteren Erkrankungen.'
    }
  },
  {
    path: 'kindertherapie',
    loadComponent: () =>
      import('./pages/kindertherapie/kindertherapie').then(m => m.Kindertherapie),
    title: 'Kindertherapie Aschersleben & Staßfurt | Horvay',
    data: {
      description:
        'Kindertherapie in Aschersleben und Staßfurt: altersgerechte ergotherapeutische Förderung für Kinder und Jugendliche.'
    }
  },
  {
    path: 'standorte',
    loadComponent: () => import('./pages/standorte/standorte').then(m => m.Standorte),
    title: 'Standorte Aschersleben & Staßfurt | Therapiezentrum Horvay',
    data: {
      description:
        'Unsere Standorte: Markt 9/10 in 06449 Aschersleben und Bernburger Straße 27 in 39418 Staßfurt. Öffnungszeiten und Kontaktdaten im Überblick.'
    }
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./pages/kontakt/kontakt').then(m => m.Kontakt),
    title: 'Kontakt & Termine | Ergotherapie Horvay Aschersleben',
    data: {
      description:
        'Kontakt zum Therapiezentrum Horvay: Aschersleben 03473 802660, Staßfurt 03925 988411. Sprechzeiten Montag bis Donnerstag 7:30–18:00 Uhr, Freitag bis 13:00 Uhr.'
    }
  },
  {
    path: 'impressum',
    loadComponent: () => import('./pages/impressum/impressum').then(m => m.Impressum),
    title: 'Impressum | Therapiezentrum Horvay',
    data: {
      description: 'Impressum des Therapiezentrums Horvay in Aschersleben und Staßfurt.'
    }
  },
  {
    path: 'datenschutz',
    loadComponent: () => import('./pages/datenschutz/datenschutz').then(m => m.Datenschutz),
    title: 'Datenschutz | Therapiezentrum Horvay',
    data: {
      description: 'Datenschutzerklärung des Therapiezentrums Horvay in Aschersleben und Staßfurt.'
    }
  },
  {
    // Prerendered so nginx can serve it as the error_page body with a real 404 status
    path: '404',
    loadComponent: () => import('./pages/nicht-gefunden/nicht-gefunden').then(m => m.NichtGefunden),
    title: 'Seite nicht gefunden | Therapiezentrum Horvay',
    data: {
      description: 'Die aufgerufene Seite existiert nicht.',
      noindex: true
    }
  },
  {
    path: '**',
    loadComponent: () => import('./pages/nicht-gefunden/nicht-gefunden').then(m => m.NichtGefunden),
    title: 'Seite nicht gefunden | Therapiezentrum Horvay',
    data: {
      description: 'Die aufgerufene Seite existiert nicht.',
      noindex: true
    }
  }
];
