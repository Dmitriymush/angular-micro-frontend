import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'assets',
  exposes: {
    './Routes': 'apps/assets/src/app/remote-entry/entry.routes.ts',
  },
  additionalShared: [
    ['@angular/core', { singleton: true, strictVersion: false, requiredVersion: 'auto' }],
    ['@angular/common', { singleton: true, strictVersion: false, requiredVersion: 'auto' }],
    ['@angular/common/http', { singleton: true, strictVersion: false, requiredVersion: 'auto' }],
    ['@angular/router', { singleton: true, strictVersion: false, requiredVersion: 'auto' }],
    ['@angular/platform-browser', { singleton: true, strictVersion: false, requiredVersion: 'auto' }],
    ['rxjs', { singleton: true, strictVersion: false, requiredVersion: 'auto' }],
    ['tslib', { singleton: true, strictVersion: false }]
  ]
};

export default config;
