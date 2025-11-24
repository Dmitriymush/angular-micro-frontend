import { createAction, props } from '@ngrx/store';
import { Asset, AssetWithVulnerabilities } from '@angular-micro-frontend/shared';

export const loadAssets = createAction(
  '[Assets] Load Assets'
);

export const loadAssetsSuccess = createAction(
  '[Assets] Load Assets Success',
  props<{ assets: Asset[] }>()
);

export const loadAssetsFailure = createAction(
  '[Assets] Load Assets Failure',
  props<{ error: string }>()
);

export const loadAsset = createAction(
  '[Assets] Load Asset',
  props<{ id: string }>()
);

export const loadAssetSuccess = createAction(
  '[Assets] Load Asset Success',
  props<{ asset: AssetWithVulnerabilities }>()
);

export const loadAssetFailure = createAction(
  '[Assets] Load Asset Failure',
  props<{ error: string }>()
);

export const clearSelectedAsset = createAction(
  '[Assets] Clear Selected Asset'
);
