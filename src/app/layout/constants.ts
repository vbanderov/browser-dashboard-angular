import { GridStackWidgetNode } from './types';

export const defaultLayout: GridStackWidgetNode[] = [
  {
    x: 0,
    y: 0,
    minW: 2,
    w: 5,
    h: 5,
    id: 0,
    content: 'TopSites',
  },
];

export const localStorageLayoutKey = 'layout';
