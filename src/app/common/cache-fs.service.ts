import { Injectable } from '@angular/core';

const cacheFsBaseUrl = 'http://cache-fs';
const cacheFsCacheName = 'cache-fs';

@Injectable({
  providedIn: 'root',
})
export class CacheFsService {
  constructor() {}

  public async put(path: string, file: File): Promise<void> {
    const cache = await caches.open(cacheFsCacheName);
    const cacheUrl = CacheFsService.getFullUrl(path);
    await cache.put(cacheUrl, new Response(file));
  }

  public static getFullUrl(uri: string): string {
    return new URL(uri, cacheFsBaseUrl).href;
  }
}
