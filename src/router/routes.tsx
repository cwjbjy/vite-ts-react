import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import AuthStatus from '@/components/authStatus';
import ErrorBoundary from '@/components/errorBoundary';
import LazyComponent from '@/components/lazyComponent';

import * as path from '../settings/routerMap';

import chartRoutes from './chart';
import dragRoutes from './drag';
import { protectedLoader } from './loader';

const routes = [
  {
    path: path.LOGIN,
    element: <LazyComponent lazyChildren={lazy(() => import('@/pages/login'))} />,
  },
  {
    path: '/',
    element: <LazyComponent lazyChildren={lazy(() => import('@/layout'))} />,
    loader: protectedLoader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={path.FIRSTITEM} replace={true} />,
      },
      {
        path: path.FIRSTITEM,
        element: <LazyComponent lazyChildren={lazy(() => import('@/pages/homePage'))} />,
      },
      {
        path: path.FLEET,
        element: <LazyComponent lazyChildren={lazy(() => import('@/pages/fleetLine'))} />,
      },
      {
        path: path.FILUP,
        element: <LazyComponent lazyChildren={lazy(() => import('@/pages/fileUp'))} />,
      },
      {
        path: path.PDF,
        element: <LazyComponent lazyChildren={lazy(() => import('@/pages/pdf'))} />,
      },
      {
        path: path.BASE_ECHARTS,
        element: <LazyComponent lazyChildren={lazy(() => import('@/pages/baseEchart'))} />,
      },
      {
        path: path.BASE_TABLE,
        element: <LazyComponent lazyChildren={lazy(() => import('@/pages/baseTable'))} />,
      },
      {
        path: path.I18N,
        element: <LazyComponent lazyChildren={lazy(() => import('@/pages/i18n'))} />,
      },
      {
        path: path.MAGNIFYING,
        element: <LazyComponent lazyChildren={lazy(() => import('@/pages/magnifying'))} />,
      },
      {
        path: path.CHARTROOM,
        element: <LazyComponent lazyChildren={lazy(() => import('@/pages/chatRoom'))} />,
      },
      {
        path: path.MANAGE,
        element: (
          <AuthStatus>
            <LazyComponent lazyChildren={lazy(() => import('@/pages/userManage'))} />
          </AuthStatus>
        ),
      },
      ...chartRoutes,
      ...dragRoutes,
    ],
  },
  {
    path: '*',
    element: <div>404页面</div>,
  },
];

export default routes;
