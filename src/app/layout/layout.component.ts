import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridStackWidget, GridStackOptions, GridStackNode } from 'gridstack';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
import { nodesCB, elementCB } from '../common/gridstack.component';
import { TopSitesComponent } from '../top-sites/top-sites.component';

const defaultLayout: GridStackNode[] = [
  {
    x: 0,
    y: 0,
    minW: 2,
    w: 5,
    h: 5,
    id: 10,
    content: TopSitesComponent.name,
  },
];

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private nodesChangeSubject = new BehaviorSubject<GridStackNode[]>([]);

  public items$: Observable<GridStackNode[]> = of(
    this.extractLayout() ?? defaultLayout
  ).pipe(
    switchMap((items) => {
      return this.nodesChangeSubject.asObservable().pipe(
        map((changes) => {
          // return new array with merged changes based on id field
          return items.map((item) => {
            const change = changes.find((c) => c.id === item.id);
            if (!change) return item;
            return { ...item, ...change, el: undefined };
          });
        })
      );
    })
  );

  // on init subscribe to changes and persist to local storage and unsubscribe on destroy
  private sub?: Subscription = undefined;
  ngOnInit(): void {
    this.sub = this.items$.subscribe((items) => {
      this.persistLayout(items);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public gridOptions: GridStackOptions = {
    margin: 5,
    float: true,
    minRow: 1,
  };

  private persistLayout(layout: GridStackNode[]) {
    localStorage.setItem('layout', JSON.stringify(layout));
  }

  private extractLayout(): GridStackNode[] | null {
    const storedLayout = localStorage.getItem('layout');

    if (!storedLayout) return null;

    return JSON.parse(storedLayout) as GridStackNode[];
  }

  /** called whenever items change size/position/etc.. */
  public onChange(data: nodesCB) {
    // NOTE: no need for dynamic as we can always use grid.save() to get latest layout, or grid.engine.nodes
    const pureNodes = data.nodes.map((n) => {
      const { x, y, content, id, maxH, maxW, minH, minW, w, h } = n;
      return { x, y, content, id, maxH, maxW, minH, minW, w, h };
    });
    this.nodesChangeSubject.next(pureNodes);
  }

  public onResizeStop(data: elementCB) {
    console.log('resizestop ', data.el.gridstackNode);
  }

  // ngFor TEMPLATE unique node id to have correct match between our items used and GS
  public identify(index: number, w: GridStackWidget) {
    return w.id; // or use index if no id is set and you only modify at the end...
  }
}
