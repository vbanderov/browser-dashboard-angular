import { Component } from '@angular/core';
import { TopSitesComponent } from './top-sites/top-sites.component';

export const widgetMap = {
  TopSites: TopSitesComponent,
};

export type WidgetType = keyof typeof widgetMap;
