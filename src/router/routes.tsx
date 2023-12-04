/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import ErrorBoundary from '@/components/errorBoundary';

import * as path from '../settings/routerMap';

const Login = lazy(() => import('@/pages/login/index'));
const HomeLayout = lazy(() => import('@/layout/index'));

const HomePage = lazy(() => import('@/pages/homePage/index'));
const FleetLine = lazy(() => import('@/pages/fleetLine/index'));
const FileUp = lazy(() => import('@/pages/fileUp'));

const PdfPreview = lazy(() => import('@/pages/pdf'));
const BaseEchart = lazy(() => import('@/pages/baseEchart/index'));
const BaseTable = lazy(() => import('@/pages/baseTable'));
const DragList = lazy(() => import('@/pages/drag/list/index'));
const DragDialog = lazy(() => import('@/pages/drag/dialog/index'));
const I18n = lazy(() => import('@/pages/i18n'));
const CommonChart = lazy(() => import('@/pages/chart/common'));
const PositionChart = lazy(() => import('@/pages/chart/position'));
const FoldChart = lazy(() => import('@/pages/chart/fold'));
const ChatRoom = lazy(() => import('@/pages/chatRoom'));
const Magnifying = lazy(() => import('@/pages/magnifying'));
const UserManage = lazy(() => import('@/pages/userManage/index'));

const routes = [
  {
    path: path.LOGIN,
    element: <Login />,
  },
  {
    element: <HomeLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: path.FIRSTITEM,
        element: <HomePage />,
      },
      {
        path: path.FLEET,
        element: <FleetLine />,
      },
      {
        path: path.FILUP,
        element: <FileUp />,
      },
      {
        path: path.PDF,
        element: <PdfPreview />,
      },
      {
        path: path.BASE_ECHARTS,
        element: <BaseEchart />,
      },
      {
        path: path.BASE_TABLE,
        element: <BaseTable />,
      },
      {
        path: path.DRAG_LIST,
        element: <DragList />,
      },
      {
        path: path.DRAG_DIALOG,
        element: <DragDialog />,
      },
      {
        path: path.I18N,
        element: <I18n />,
      },
      {
        path: path.COMMON_CHART,
        element: <CommonChart />,
      },
      {
        path: path.POSITION_CHART,
        element: <PositionChart />,
      },
      {
        path: path.FLOD_CHART,
        element: <FoldChart />,
      },
      {
        path: path.MAGNIFYING,
        element: <Magnifying />,
      },
      {
        path: path.CHARTROOM,
        element: <ChatRoom />,
      },
      {
        path: path.MANAGE,
        element: <UserManage />,
      },
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
