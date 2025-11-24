import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'users',
  exposes: {
    './Routes': 'apps/users/src/app/remote-entry/entry.routes.ts',
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

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
