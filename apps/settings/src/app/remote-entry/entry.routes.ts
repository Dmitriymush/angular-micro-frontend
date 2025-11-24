import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../pages/settings-home/settings-home.component').then(m => m.SettingsHomeComponent)
  }
];