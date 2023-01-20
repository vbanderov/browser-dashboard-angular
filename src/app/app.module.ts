import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsComponent } from './settings/settings.component';
import { TopSitesComponent } from './top-sites/top-sites.component';

@NgModule({
  declarations: [AppComponent, SettingsComponent, TopSitesComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('my-service-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
      // scope: '/cache-fs/',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
