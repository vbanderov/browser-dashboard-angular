import { Component } from '@angular/core';
import { CacheFsService } from './common/cache-fs.service';
import { SettingsComponent } from './settings/settings.component';
import { GridStackOptions, GridStackWidget } from 'gridstack';
import {
  GridstackComponent,
  elementCB,
  nodesCB,
} from './common/gridstack.component';
let ids = 1;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public background = CacheFsService.getFullUrl('user-background');
  /** sample grid options and items to load... */
  public items: GridStackWidget[] = [
    { x: 0, y: 0, minW: 2 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ];
  public gridOptions: GridStackOptions = {
    margin: 5,
    float: true,
    minRow: 1,
  };
  public gridOptionsFull: GridStackOptions = {
    ...this.gridOptions,
    children: this.items,
  };
  constructor(cacheFsService: CacheFsService) {
    // give them content and unique id to make sure we track them during changes below...
    this.items.forEach((w, i) => {
      w.content = i ? `item ${ids}` : 'top-sites';
      w.id = String(ids++);
    });
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

  /** called whenever items change size/position/etc.. */
  public onChange(data: nodesCB) {
    // TODO: update our TEMPLATE list to match ?
    // NOTE: no need for dynamic as we can always use grid.save() to get latest layout, or grid.engine.nodes
    console.log('change ', data.nodes.length > 1 ? data.nodes : data.nodes[0]);
  }

  public onResizeStop(data: elementCB) {
    console.log('resizestop ', data.el.gridstackNode);
  }

  /**
   * TEST TEMPLATE operations for ngFor case - NOT recommended unless you have no GS creating/re-parenting
   */
  public addNgFor() {
    // new array isn't required as Angular detects changes to content with trackBy:identify()
    // this.items = [...this.items, { x:3, y:0, w:3, content:`item ${ids}`, id:String(ids++) }];
    this.items.push({
      x: 3,
      y: 0,
      w: 2,
      content: `item ${ids}`,
      id: String(ids++),
    });
  }
  public deleteNgFor() {
    this.items.pop();
  }
  public modifyNgFor(gridComp: GridstackComponent) {
    // this will not update the DOM nor trigger gridstackItems.changes for GS to auto-update, so set new option of the gridItem instead
    // this.items[0].w = 3;
    const gridItem = gridComp.gridstackItems?.get(0);
    if (gridItem) gridItem.options = { w: 3 };
  }
  public newLayoutNgFor() {
    this.items = [
      { x: 0, y: 1, id: '1', minW: 1, w: 1 }, // new size/constrain
      { x: 1, y: 1, id: '2' },
      // {x:2, y:1, id:'3'}, // delete item
      { x: 3, y: 0, w: 2, content: 'new item' }, // new item
    ];
  }
  // ngFor TEMPLATE unique node id to have correct match between our items used and GS
  public identify(index: number, w: GridStackWidget) {
    return w.id; // or use index if no id is set and you only modify at the end...
  }
}
