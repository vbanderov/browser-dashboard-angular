import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsComponent } from './settings/settings.component';
import { TopSitesComponent } from './widgets/top-sites/top-sites.component';
import { GridstackItemComponent } from './layout/gridstack-item.component';
import { WidgetHostDirective } from './widget-host.directive';
import { LayoutComponent } from './layout/layout.component';
import { GridstackComponent } from './layout/gridstack.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    TopSitesComponent,
    GridstackComponent,
    GridstackItemComponent,
    WidgetHostDirective,
    LayoutComponent,
  ],
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
