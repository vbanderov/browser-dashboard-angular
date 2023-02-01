import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridStackWidget, GridStackOptions, GridStackNode } from 'gridstack';

import { nodesCB, elementCB } from './gridstack.component';
import { GridStackWidgetNode } from './types';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(public layoutService: LayoutService) {}

  /** called whenever items change size/position/etc.. */
  public onChange(data: nodesCB) {
    // NOTE: no need for dynamic as we can always use grid.save() to get latest layout, or grid.engine.nodes
    const pureNodes = data.nodes.map((n) => {
      const { x, y, content, id, maxH, maxW, minH, minW, w, h } = n;
      return { x, y, content, id, maxH, maxW, minH, minW, w, h };
    });
    this.layoutService.updateLayout(pureNodes as GridStackWidgetNode[]);
  }

  public onResizeStop(data: elementCB) {
    console.log('resizestop ', data.el.gridstackNode);
  }

  // ngFor TEMPLATE unique node id to have correct match between our items used and GS
  public identify(index: number, w: GridStackWidget) {
    return w.id; // or use index if no id is set and you only modify at the end...
  }
}
