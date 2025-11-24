import { Asset, AssetWithVulnerabilities } from '@angular-micro-frontend/shared';

export interface AssetsState {
  assets: Asset[];
  selectedAsset: AssetWithVulnerabilities | null;
  loading: boolean;
  error: string | null;
}

export const initialAssetsState: AssetsState = {
  assets: [],
  selectedAsset: null,
  loading: false,
  error: null
};