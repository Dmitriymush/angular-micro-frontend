import { createReducer, on } from '@ngrx/store';
import { AssetsState, initialAssetsState } from './assets.state';
import * as AssetsActions from './assets.actions';

export const assetsReducer = createReducer(
  initialAssetsState,

  // Load Assets
  on(AssetsActions.loadAssets, (state): AssetsState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AssetsActions.loadAssetsSuccess, (state, { assets }): AssetsState => ({
    ...state,
    assets,
    loading: false,
    error: null
  })),

  on(AssetsActions.loadAssetsFailure, (state, { error }): AssetsState => ({
    ...state,
    loading: false,
    error
  })),

  // Load Single Asset
  on(AssetsActions.loadAsset, (state): AssetsState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AssetsActions.loadAssetSuccess, (state, { asset }): AssetsState => ({
    ...state,
    selectedAsset: asset,
    loading: false,
    error: null
  })),

  on(AssetsActions.loadAssetFailure, (state, { error }): AssetsState => ({
    ...state,
    loading: false,
    error
  })),

  on(AssetsActions.clearSelectedAsset, (state): AssetsState => ({
    ...state,
    selectedAsset: null
  }))
);
