import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';

declare global {
  interface Window {
    __USE_MSW__?: boolean;
  }
}

async function prepare() {
  if (isDevMode() && window.__USE_MSW__) {
    console.log('🔧 Initializing Mock Service Worker...');
    const { worker } = await import('../../../tools/mock-server/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    console.log('✅ Mock Service Worker is ready!');
  }
}

prepare().then(() => {
  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
});
