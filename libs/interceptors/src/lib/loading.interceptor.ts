import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';

/**
 * Loading Interceptor - Shows/hides loading indicator for HTTP requests
 *
 * Usage in app.config.ts:
 * provideHttpClient(
 *   withInterceptors([loadingInterceptor])
 * )
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Show loading indicator
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      // Hide loading indicator when request completes
      loadingService.hide();
    })
  );
};