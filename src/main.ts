import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {RotasService} from "./app/rotas.service";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {ErrorHandlerService} from "./handler/error-handler.service";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideRouter(routes),
    {
      provide: RotasService
    },
    {
      provide: ErrorHandlerService
    }
  ],
});
