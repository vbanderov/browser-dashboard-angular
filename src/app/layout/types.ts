import { GridStackNode } from 'gridstack';
import { WidgetType } from '../widgets';

export interface GridStackWidgetNode extends GridStackNode {
  content: WidgetType;
}
