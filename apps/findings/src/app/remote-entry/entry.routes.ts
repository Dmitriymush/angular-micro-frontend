import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { findingsReducer } from '../state/findings.reducer';
import { FindingsEffects } from '../state/findings.effects';

export const remoteRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideState({ name: 'findings', reducer: findingsReducer }),
      provideEffects([FindingsEffects])
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/findings-list/findings-list.component').then(m => m.FindingsListComponent)
      }
    ]
  }
];
