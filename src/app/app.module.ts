/** @module app/app */

/**
 * @description Main global module, imports, exports and providers here are global
 * 
 */

// Require global angular dependencies
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';


// Import touch functionality of material components
import 'hammerjs';

// Import main layout modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SidenavService } from './core/layout/sidenav/sidenav.service';
import { SidenavItem } from './core/layout/sidenav/sidenav-item/sidenav-item.interface';

// Require global services
import { LoginService } from "./services/login.service";
import { AuthInterceptorService } from './services/auth-interceptor.service';

// Import environment configuration
import { environment } from '../environments/environment';

// Define locale configurations for datetime and languages
import localeMx from '@angular/common/locales/es-MX';
import { MAT_DATE_LOCALE } from '@angular/material';
registerLocaleData(localeMx, 'es');

// Define translation source loading function
export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Define angular decorator for this module
@NgModule({
  // Import other modules
  imports: [
    // Angular Core Module // Don't remove!
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    // Fury Core Modules
    CoreModule,
    AppRoutingModule,
    // Translate aplication
    TranslateModule.forRoot({
      loader: {
         provide: TranslateLoader,
         useFactory: customTranslateLoader,
         deps: [HttpClient]
      }
    }),
    // Register a Service Worker (optional)
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    // Define global providers
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    // Userdata service
    LoginService,
    // Use sidenav service for menu configuration
    SidenavService,
    SidenavItem,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  // Define usable components into this module
  declarations: [AppComponent],
  // Define starting component for global app
  bootstrap: [AppComponent]
})

// Export this class (Global class)
export class AppModule {
}
