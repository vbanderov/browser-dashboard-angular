/**
 * gridstack-item.component.ts 7.2.2
 * Copyright (c) 2022 Alain Dumesny - see GridStack root license
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { GridItemHTMLElement, GridStackNode } from 'gridstack';
import { TopSitesComponent } from '../widgets/top-sites/top-sites.component';
import { WidgetHostDirective } from '../widget-host.directive';

/**
 * HTML Component Wrapper for gridstack items, in combination with GridstackComponent for parent grid
 */
@Component({
  selector: 'app-gridstack-item',
  template: ` <div class="grid-stack-item-content bg-white/90">
    <ng-template appWidgetHost></ng-template>
  </div>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridstackItemComponent {
  @ViewChild(WidgetHostDirective, { static: true })
  widgetHost!: WidgetHostDirective;

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.widgetHost.viewContainerRef;
    viewContainerRef.clear();

    if (this.options.content === TopSitesComponent.name) {
      const componentRef = viewContainerRef.createComponent(TopSitesComponent);
    }
  }

  /** list of options for creating/updating this item */
  @Input() public set options(val: GridStackNode) {
    if (!this.el.gridstackNode?.grid) {
      val.el = this.el;
      this._options = val;
    }
  }
  /** return the latest grid options (from GS once built, otherwise initial values) */
  public get options(): GridStackNode {
    return this.el.gridstackNode || this._options || {};
  }

  private _options?: GridStackNode;

  /** return the native element that contains grid specific fields as well */
  public get el(): GridItemHTMLElement {
    return this.elementRef.nativeElement;
  }

  /** clears the initial options now that we've built */
  public clearOptions() {
    delete this._options;
  }

  constructor(private readonly elementRef: ElementRef<GridItemHTMLElement>) {}
}
