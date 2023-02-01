import { Component } from '@angular/core';

@Component({
  selector: 'app-top-sites',
  templateUrl: './top-sites.component.html',
  styleUrls: ['./top-sites.component.scss'],
})
export class TopSitesComponent {
  public readonly chrome = window.chrome;
  topSites: any[] = [
    { title: 'LinkedIn', url: 'https://linkedin.com/' },
    {
      title: 'Online Courses - Learn Anything, On Your Schedule | Udemy',
      url: 'https://udemy.com/',
    },
    {
      title: 'Gmail',
      url: 'https://gmail.com/',
    },
    {
      title: 'Amazon.ca: Low Prices – Fast Shipping – Millions of Items',
      url: 'https://amazon.ca/',
    },
    { title: 'WhatsApp', url: 'https://web.whatsapp.com/' },
  ];

  ngOnInit() {
    if (!this.chrome?.topSites) return;

    this.chrome.topSites.get().then((res) => {
      this.topSites = res as any[];
    });
  }
}
