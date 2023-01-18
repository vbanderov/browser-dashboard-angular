import { Component } from '@angular/core';
import { CacheFsService } from './common/cache-fs.service';
import { SettingsComponent } from './settings/settings.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public background = CacheFsService.getFullUrl('user-background');

  constructor(cacheFsService: CacheFsService) {}

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
