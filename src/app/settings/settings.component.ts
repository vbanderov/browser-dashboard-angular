import { Component } from '@angular/core';
import { CacheFsService } from '../common/cache-fs.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  public showSettings = false;

  constructor(private cacheFsService: CacheFsService) {}

  public async confirmBackground(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) {
      return;
    }

    await this.cacheFsService.put('user-background', file);

    window.location.reload();
  }
}
