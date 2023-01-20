import { Component } from '@angular/core';

@Component({
  selector: 'app-top-sites',
  templateUrl: './top-sites.component.html',
  styleUrls: ['./top-sites.component.scss'],
})
export class TopSitesComponent {
  public readonly chrome = window.chrome;
  topSites: any[] = [];

  ngOnInit() {
    this.chrome.topSites.get().then((res) => {
      this.topSites = res as any[];
    });
  }
}
