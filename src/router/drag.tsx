import { lazy } from 'react';

import LazyImportComponent from '@/components/lazyImportComponent';

import * as path from '../settings/routerMap';

const dragRoutes = [
  {
    path: path.DRAG_LIST,
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/drag/list'))} />,
  },
  {
    path: path.DRAG_DIALOG,
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/drag/dialog'))} />,
  },
];

export default dragRoutes;
