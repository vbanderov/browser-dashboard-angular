import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'browser-dashboard';
  background = '/cache-fs/user-background';

  async ngOnInit() {
    const cache = await caches.open('v1');
    const backgroundFileResponse = await cache.match('/user-background');

    if (!backgroundFileResponse) {
      return;
    }

    // this.background = await fileToBase64(await backgroundFileResponse.blob())
  }

  public async confirm(event: Event) {
    console.log('clicked');
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) {
      return;
    }

    const cache = await caches.open('v1');
    await cache.put('/user-background', new Response(file));
    // this.background = await fileToBase64(file)
  }
}

async function fileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const base64Image = reader.result as string;

        resolve(base64Image);
      },
      false
    );
    reader.readAsDataURL(file);
  });
}
