import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { topSitesDemo } from './constants';

@Component({
  selector: 'app-top-sites',
  templateUrl: './top-sites.component.html',
  styleUrls: ['./top-sites.component.scss'],
})
export class TopSitesComponent implements OnInit {
  public readonly chrome = window.chrome;
  public topSites = topSitesDemo;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.chrome?.topSites) return;

    this.chrome.topSites.get().then((res) => {
      this.topSites = res as any[];
      this.ref.detectChanges();
    });
  }

  public getFaviconUrl(url: string) {
    if (!this.chrome.runtime) return 'favicon.ico';

    return `/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
  }
}
