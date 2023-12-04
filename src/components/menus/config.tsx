import type { MenuProps } from 'antd';

import BaseTable from '@/assets/images/menus/baseTable.png';
import Chat from '@/assets/images/menus/chat.png';
import Drag from '@/assets/images/menus/drag.png';
import Echarts from '@/assets/images/menus/echarts.png';
import ChinaMap from '@/assets/images/menus/echarts_heatmap.png';
import FlowChart from '@/assets/images/menus/flowChart.png';
import Home from '@/assets/images/menus/home.png';
import I18n from '@/assets/images/menus/I18n.png';
import Magnifying from '@/assets/images/menus/magnifying.png';
import Manage from '@/assets/images/menus/manage.png';
import Pdf from '@/assets/images/menus/pdf.png';
import Upload from '@/assets/images/menus/upload.png';
import * as path from '@/settings/routerMap';

export type MenuItem = Required<MenuProps>['items'][number];

export const menus: MenuItem[] = [
  {
    label: '系统首页',
    key: path.FIRSTITEM,
    icon: <img src={Home} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '模拟航线',
    key: path.FLEET,
    icon: <img src={ChinaMap} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '图片上传',
    key: path.FILUP,
    icon: <img src={Upload} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '文件预览',
    key: path.PDF,
    icon: <img src={Pdf} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '基础图表',
    key: path.BASE_ECHARTS,
    icon: <img src={Echarts} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '基础表格',
    key: path.BASE_TABLE,
    icon: <img src={BaseTable} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '拖拽组件',
    key: path.DRAG,
    icon: <img src={Drag} alt="加载失败" className="menuIcon"></img>,
    children: [
      {
        label: '拖拽列表',
        key: path.DRAG_LIST,
      },
      {
        label: '拖拽弹框',
        key: path.DRAG_DIALOG,
      },
    ],
  },
  {
    label: '语言转换',
    icon: <img src={I18n} alt="加载失败" className="menuIcon"></img>,
    key: path.I18N,
  },
  {
    label: '流程图',
    key: path.FLOW_CHART,
    icon: <img src={FlowChart} alt="加载失败" className="menuIcon"></img>,
    children: [
      {
        label: '一般流程图',
        key: path.COMMON_CHART,
      },
      {
        label: '定位流程图',
        key: path.POSITION_CHART,
      },
      {
        label: '折叠流程图',
        key: path.FLOD_CHART,
      },
    ],
  },
  {
    label: '放大镜',
    key: path.MAGNIFYING,
    icon: <img src={Magnifying} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '聊天室',
    key: path.CHARTROOM,
    icon: <img src={Chat} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '后台管理',
    key: path.MANAGE,
    icon: <img src={Manage} alt="加载失败" className="menuIcon"></img>,
  },
];
