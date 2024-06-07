import 'antd/dist/reset.css';
import './assets/icon/iconfont.css';

import { RouterProvider } from 'react-router-dom';

import { TYPES, init } from 'cwj_monitoring';
import ReactDOM from 'react-dom/client';

import router from './router';
import './utils/observer';
import './utils/i18';

import '@/assets/styles/index.css';

import { baseURL } from '@/settings/user';

//自己的npm包，数据埋点
init({
  url: `${baseURL}/track`, //必传参数，数据上传服务器地址
  plugin: [TYPES.ROUTER], //监听路由
  data: {
    vs: 'react-manage',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
