import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import ErrorBoundary from '@/components/errorBoundary';
import LazyImportComponent from '@/components/lazyImportComponent';

import * as path from '../settings/routerMap';

import chartRoutes from './chart';
import dragRoutes from './drag';

const routes = [
  {
    path: path.LOGIN,
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/login'))} />,
  },
  {
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/layout'))} />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: path.FIRSTITEM,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/homePage'))} />,
      },
      {
        path: path.FLEET,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/fleetLine'))} />,
      },
      {
        path: path.FILUP,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/fileUp'))} />,
      },
      {
        path: path.PDF,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/pdf'))} />,
      },
      {
        path: path.BASE_ECHARTS,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/baseEchart'))} />,
      },
      {
        path: path.BASE_TABLE,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/baseTable'))} />,
      },
      {
        path: path.I18N,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/i18n'))} />,
      },
      {
        path: path.MAGNIFYING,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/magnifying'))} />,
      },
      {
        path: path.CHARTROOM,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/chatRoom'))} />,
      },
      {
        path: path.MANAGE,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/userManage'))} />,
      },
      ...chartRoutes,
      ...dragRoutes,
      {
        path: '/',
        element: (
          <>
            <Navigate to={path.FIRSTITEM} replace={true} />
          </>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <div>404页面</div>,
  },
];

export default routes;
