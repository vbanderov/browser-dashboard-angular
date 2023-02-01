import { Component } from '@angular/core';
import { CacheFsService } from './common/cache-fs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public background = CacheFsService.getFullUrl('user-background');

  constructor(cacheFsService: CacheFsService) {
    // give them content and unique id to make sure we track them during changes below...
    // this.items.forEach((w, i) => {
    //   w.content = i ? `item ${ids}` : 'top-sites';
    //   w.id = String(ids++);
    // });
  }

  async ngOnInit() {
    // const cache = await caches.open('v1');
    // const backgroundFileResponse = await cache.match(
    //   'http://cache-fs/user-background'
    // );
    // if (!backgroundFileResponse) {
    //   return;
    // }
    // this.background = await fileToBase64(await backgroundFileResponse.blob())
  }
}
