import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../pages/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent)
  }
];
