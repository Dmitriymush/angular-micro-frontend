import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssetsState } from './assets.state';

export const selectAssetsState = createFeatureSelector<AssetsState>('assets');

export const selectAllAssets = createSelector(
  selectAssetsState,
  (state) => state.assets
);

export const selectSelectedAsset = createSelector(
  selectAssetsState,
  (state) => state.selectedAsset
);

export const selectAssetsLoading = createSelector(
  selectAssetsState,
  (state) => state.loading
);

export const selectAssetsError = createSelector(
  selectAssetsState,
  (state) => state.error
);

export const selectAssetById = (id: string) =>
  createSelector(selectAllAssets, (assets) =>
    assets.find((asset) => asset.id === id)
  );

export const selectActiveAssets = createSelector(
  selectAllAssets,
  (assets) => assets.filter((asset) => asset.status === 'active')
);

export const selectInactiveAssets = createSelector(
  selectAllAssets,
  (assets) => assets.filter((asset) => asset.status === 'inactive')
);

export const selectAssetsCount = createSelector(
  selectAllAssets,
  (assets) => assets.length
);