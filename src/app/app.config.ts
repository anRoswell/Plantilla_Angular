// Angular
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

// PrimeNg
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';

// Interceptors
import { tokenInterceptor } from './interceptors/token.interceptor';
import { ThrottleInterceptor } from './interceptors/throttle.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor, ThrottleInterceptor, LoadingInterceptor, ErrorInterceptor])),
    MessageService,
    provideAnimations(),
  ],
};
