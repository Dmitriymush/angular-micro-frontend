import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { usersReducer } from '../state/users.reducer';
import { UsersEffects } from '../state/users.effects';

export const remoteRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideState({ name: 'users', reducer: usersReducer }),
      provideEffects([UsersEffects])
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/users-list/users-list.component').then(m => m.UsersListComponent)
      }
    ]
  }
];