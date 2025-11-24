import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { assetsReducer } from '../state/assets.reducer';
import { AssetsEffects } from '../state/assets.effects';

export const remoteRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideState({ name: 'assets', reducer: assetsReducer }),
      provideEffects([AssetsEffects])
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/assets-list/assets-list.component').then(m => m.AssetsListComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('../pages/asset-detail/asset-detail.component').then(m => m.AssetDetailComponent)
      }
    ]
  }
];