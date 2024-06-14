import { lazy } from 'react';

import LazyComponent from '@/components/lazyComponent';

import * as path from '../settings/routerMap';

const chartRoutes = [
  {
    path: path.COMMON_CHART,
    element: <LazyComponent lazyChildren={lazy(() => import('@/pages/chart/common'))} />,
  },
  {
    path: path.POSITION_CHART,
    element: <LazyComponent lazyChildren={lazy(() => import('@/pages/chart/position'))} />,
  },
  {
    path: path.FLOD_CHART,
    element: <LazyComponent lazyChildren={lazy(() => import('@/pages/chart/fold'))} />,
  },
];

export default chartRoutes;
