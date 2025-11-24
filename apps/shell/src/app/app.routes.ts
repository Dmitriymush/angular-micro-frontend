import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'dashboard',
        loadChildren: () => import('dashboard/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'assets',
        loadChildren: () => import('assets/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'findings',
        loadChildren: () => import('findings/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'users',
        loadChildren: () => import('users/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'settings',
        loadChildren: () => import('settings/Routes').then((m) => m!.remoteRoutes),
      },
    ],
  },
];
