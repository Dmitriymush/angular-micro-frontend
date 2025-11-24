import { assetsReducer } from './assets.reducer';
import { initialAssetsState, AssetsState } from './assets.state';
import * as AssetsActions from './assets.actions';
import { RandomHelper } from '@angular-micro-frontend/shared';

describe('AssetsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'Unknown' };
      const result = assetsReducer(initialAssetsState, action as any);

      expect(result).toBe(initialAssetsState);
    });
  });

  describe('loadAssets action', () => {
    it('should set loading to true', () => {
      const action = AssetsActions.loadAssets();
      const result = assetsReducer(initialAssetsState, action);

      expect(result.loading).toBe(true);
    });

    it('should clear error', () => {
      const previousState: AssetsState = {
        ...initialAssetsState,
        error: 'Previous error'
      };
      const action = AssetsActions.loadAssets();
      const result = assetsReducer(previousState, action);

      expect(result.error).toBeNull();
    });
  });

  describe('loadAssetsSuccess action', () => {
    it('should populate assets array', () => {
      const assets = RandomHelper.randomAssets(3);
      const action = AssetsActions.loadAssetsSuccess({ assets });
      const result = assetsReducer(initialAssetsState, action);

      expect(result.assets).toEqual(assets);
    });

    it('should set loading to false', () => {
      const assets = RandomHelper.randomAssets(2);
      const action = AssetsActions.loadAssetsSuccess({ assets });
      const result = assetsReducer(initialAssetsState, action);

      expect(result.loading).toBe(false);
    });

    it('should clear error', () => {
      const previousState: AssetsState = {
        ...initialAssetsState,
        error: 'Previous error'
      };
      const assets = RandomHelper.randomAssets(1);
      const action = AssetsActions.loadAssetsSuccess({ assets });
      const result = assetsReducer(previousState, action);

      expect(result.error).toBeNull();
    });
  });

  describe('loadAssetsFailure action', () => {
    it('should set error message', () => {
      const errorMessage = RandomHelper.randomString(10);
      const action = AssetsActions.loadAssetsFailure({ error: errorMessage });
      const result = assetsReducer(initialAssetsState, action);

      expect(result.error).toBe(errorMessage);
    });

    it('should set loading to false', () => {
      const errorMessage = RandomHelper.randomString(10);
      const action = AssetsActions.loadAssetsFailure({ error: errorMessage });
      const result = assetsReducer(initialAssetsState, action);

      expect(result.loading).toBe(false);
    });
  });

  describe('loadAsset action', () => {
    it('should set loading to true', () => {
      const id = RandomHelper.randomString(8);
      const action = AssetsActions.loadAsset({ id });
      const result = assetsReducer(initialAssetsState, action);

      expect(result.loading).toBe(true);
    });

    it('should clear error', () => {
      const previousState: AssetsState = {
        ...initialAssetsState,
        error: 'Previous error'
      };
      const id = RandomHelper.randomString(8);
      const action = AssetsActions.loadAsset({ id });
      const result = assetsReducer(previousState, action);

      expect(result.error).toBeNull();
    });
  });

  describe('loadAssetSuccess action', () => {
    it('should set selected asset', () => {
      const asset = { ...RandomHelper.randomAsset(), vulnerabilities: RandomHelper.randomVulnerabilities(2) };
      const action = AssetsActions.loadAssetSuccess({ asset });
      const result = assetsReducer(initialAssetsState, action);

      expect(result.selectedAsset).toEqual(asset);
    });

    it('should set loading to false', () => {
      const asset = { ...RandomHelper.randomAsset(), vulnerabilities: RandomHelper.randomVulnerabilities(2) };
      const action = AssetsActions.loadAssetSuccess({ asset });
      const result = assetsReducer(initialAssetsState, action);

      expect(result.loading).toBe(false);
    });

    it('should clear error', () => {
      const previousState: AssetsState = {
        ...initialAssetsState,
        error: 'Previous error'
      };
      const asset = { ...RandomHelper.randomAsset(), vulnerabilities: RandomHelper.randomVulnerabilities(2) };
      const action = AssetsActions.loadAssetSuccess({ asset });
      const result = assetsReducer(previousState, action);

      expect(result.error).toBeNull();
    });
  });

  describe('loadAssetFailure action', () => {
    it('should set error message', () => {
      const errorMessage = RandomHelper.randomString(10);
      const action = AssetsActions.loadAssetFailure({ error: errorMessage });
      const result = assetsReducer(initialAssetsState, action);

      expect(result.error).toBe(errorMessage);
    });

    it('should set loading to false', () => {
      const errorMessage = RandomHelper.randomString(10);
      const action = AssetsActions.loadAssetFailure({ error: errorMessage });
      const result = assetsReducer(initialAssetsState, action);

      expect(result.loading).toBe(false);
    });
  });

  describe('clearSelectedAsset action', () => {
    it('should clear selected asset', () => {
      const asset = { ...RandomHelper.randomAsset(), vulnerabilities: RandomHelper.randomVulnerabilities(2) };
      const previousState: AssetsState = {
        ...initialAssetsState,
        selectedAsset: asset
      };
      const action = AssetsActions.clearSelectedAsset();
      const result = assetsReducer(previousState, action);

      expect(result.selectedAsset).toBeNull();
    });

    it('should preserve other state properties', () => {
      const assets = RandomHelper.randomAssets(3);
      const selectedAsset = { ...RandomHelper.randomAsset(), vulnerabilities: RandomHelper.randomVulnerabilities(2) };
      const previousState: AssetsState = {
        assets,
        selectedAsset,
        loading: false,
        error: null
      };
      const action = AssetsActions.clearSelectedAsset();
      const result = assetsReducer(previousState, action);

      expect(result.assets).toEqual(assets);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
    });
  });
});