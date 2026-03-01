import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDataService } from './core/services/mock-data.service';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(MockDataService, { delay: 500, dataEncapsulation: false }))
  ]
};
