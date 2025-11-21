import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/startseite/startseite').then(m => m.Startseite),
    title: "Startseite - Therapiezentrum Horvay"
  },
  {
    path: 'ueber-uns',
    loadComponent: () => import('./pages/ueber-uns/ueber-uns').then(m => m.UeberUns),
    title: "Über uns - Therapiezentrum Horvay"
  },
  {
    path: 'ergotherapie',
    loadComponent: () => import('./pages/ergotherapie/ergotherapie').then(m => m.Ergotherapie),
    title: "Ergotherapie - Therapiezentrum Horvay"
  },
  {
    path: 'feinmotoriktherapie',
    loadComponent: () => import('./pages/feinmotoriktherapie/feinmotoriktherapie').then(m => m.Feinmotoriktherapie),
    title: "Feinmotoriktherapie - Therapiezentrum Horvay"
  },
  {
    path: 'neurologie',
    loadComponent: () => import('./pages/neurologie/neurologie').then(m => m.Neurologie),
    title: "Neurologie - Therapiezentrum Horvay"
  },
  {
    path: 'kindertherapie',
    loadComponent: () => import('./pages/kindertherapie/kindertherapie').then(m => m.Kindertherapie),
    title: "Kinderherapie - Therapiezentrum Horvay"
  },
  {
    path: 'standorte',
    loadComponent: () => import('./pages/standorte/standorte').then(m => m.Standorte),
    title: "Standorte - Therapiezentrum Horvay"
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./pages/kontakt/kontakt').then(m => m.Kontakt),
    title: "Kontakt - Therapiezentrum Horvay"
  },
  {
    path: 'impressum',
    loadComponent: () => import('./pages/impressum/impressum').then(m => m.Impressum),
    title: "Impressum - Therapiezentrum Horvay"
  },
  {
    path: 'datenschutz',
    loadComponent: () => import('./pages/datenschutz/datenschutz').then(m => m.Datenschutz),
    title: "Datenschutz - Therapiezentrum Horvay"
  }
];
