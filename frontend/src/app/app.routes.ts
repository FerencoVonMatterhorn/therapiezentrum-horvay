import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/startseite/startseite').then(m => m.Startseite)
  },
  {
    path: 'ueber-uns',
    loadComponent: () => import('./pages/ueber-uns/ueber-uns').then(m => m.UeberUns)
  },
  {
    path: 'ergotherapie',
    loadComponent: () => import('./pages/ergotherapie/ergotherapie').then(m => m.Ergotherapie)
  },
  {
    path: 'feinmotoriktherapie',
    loadComponent: () => import('./pages/feinmotoriktherapie/feinmotoriktherapie').then(m => m.Feinmotoriktherapie)
  },
  {
    path: 'neurologie',
    loadComponent: () => import('./pages/neurologie/neurologie').then(m => m.Neurologie)
  },
  {
    path: 'kindertherapie',
    loadComponent: () => import('./pages/kindertherapie/kindertherapie').then(m => m.Kindertherapie)
  },
  {
    path: 'standorte',
    loadComponent: () => import('./pages/standorte/standorte').then(m => m.Standorte)
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./pages/kontakt/kontakt').then(m => m.Kontakt)
  },
  {
    path: 'impressum',
    loadComponent: () => import('./pages/impressum/impressum').then(m => m.Impressum)
  },
  {
    path: 'datenschutz',
    loadComponent: () => import('./pages/datenschutz/datenschutz').then(m => m.Datenschutz)
  }
];