import 'antd/dist/reset.css';
import './assets/icon/iconfont.css';

import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { TYPES, init } from 'cwj_monitoring';
import ReactDOM from 'react-dom/client';

import FullScreenLoading from '@/components/layout/loading';

import router from './router';
import './utils/observer';
import './utils/i18';

//自己的npm包，数据埋点
init({
  url: `${import.meta.env.VITE_APP_AUTH_URL}/track`, //必传参数，数据上传服务器地址
  plugin: [TYPES.ROUTER], //监听路由
  data: {
    vs: 'react-manage',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Suspense fallback={<FullScreenLoading />}>
    <RouterProvider router={router} />
  </Suspense>,
);
