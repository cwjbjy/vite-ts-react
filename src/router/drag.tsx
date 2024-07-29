import { lazy } from 'react';

import LazyComponent from '@/components/lazyComponent';

import * as path from '../settings/routerMap';

const dragRoutes = [
  {
    path: path.DRAG_LIST,
    element: <LazyComponent lazyChildren={lazy(() => import('@/pages/drag/list'))} />,
  },
  {
    path: path.DRAG_DIALOG,
    element: <LazyComponent lazyChildren={lazy(() => import('@/pages/drag/dialog'))} />,
  },
];

export default dragRoutes;
