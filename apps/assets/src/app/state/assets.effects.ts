import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AssetService } from '@angular-micro-frontend/api';
import * as AssetsActions from './assets.actions';

@Injectable()
export class AssetsEffects {
  private actions$ = inject(Actions);
  private assetService = inject(AssetService);

  loadAssets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetsActions.loadAssets),
      switchMap(() =>
        this.assetService.getAssets().pipe(
          map((assets) => AssetsActions.loadAssetsSuccess({ assets })),
          catchError((error) =>
            of(AssetsActions.loadAssetsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetsActions.loadAsset),
      switchMap(({ id }) =>
        this.assetService.getAssetById(id).pipe(
          map((asset) => AssetsActions.loadAssetSuccess({ asset })),
          catchError((error) =>
            of(AssetsActions.loadAssetFailure({ error: error.message }))
          )
        )
      )
    )
  );
}