import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'requests' },
  {
    path: '',
    loadComponent: () => import('./layouts/reports-layout/reports-layout.component').then((module) => module.ReportsLayoutComponent),
    children: [{
      path: 'requests',
      loadComponent: () => import('./features/reports/pages/requests-page/requests-page.component').then((module) => module.RequestsPageComponent)
    }]
  },
  { path: '**', redirectTo: 'requests' }
];
