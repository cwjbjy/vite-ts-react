import { lazy } from 'react';

import LazyImportComponent from '@/components/lazyImportComponent';

import * as path from '../settings/routerMap';

const chartRoutes = [
  {
    path: path.COMMON_CHART,
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/chart/common'))} />,
  },
  {
    path: path.POSITION_CHART,
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/chart/position'))} />,
  },
  {
    path: path.FLOD_CHART,
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/chart/fold'))} />,
  },
];

export default chartRoutes;
