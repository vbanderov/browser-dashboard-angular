import { Injectable } from '@angular/core';
import { GridStackOptions } from 'gridstack';
import { Observable, of, switchMap, map, Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { defaultLayout, localStorageLayoutKey } from './constants';
import { GridStackWidgetNode } from './types';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private nodesChangeSubject = new BehaviorSubject<GridStackWidgetNode[]>([]);

  public items$: Observable<GridStackWidgetNode[]> = of(
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

  public readonly gridOptions: GridStackOptions = {
    margin: 5,
    float: true,
    minRow: 1,
  };

  constructor() {
    this.items$.subscribe((items) => {
      this.persistLayout(items);
    });
  }

  public readonly updateLayout = (layout: GridStackWidgetNode[]) => {
    this.nodesChangeSubject.next(layout);
  };

  private persistLayout(layout: GridStackWidgetNode[]) {
    localStorage.setItem(localStorageLayoutKey, JSON.stringify(layout));
  }

  private extractLayout(): GridStackWidgetNode[] | null {
    const storedLayout = localStorage.getItem(localStorageLayoutKey);

    if (!storedLayout) return null;

    return JSON.parse(storedLayout) as GridStackWidgetNode[];
  }
}
