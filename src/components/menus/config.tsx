import { getAssetsFile } from '@/utils/share';

import type { MenuProps } from 'antd';

import * as path from '@/settings/routerMap';

export type MenuItem = Required<MenuProps>['items'][number];

export const menus: MenuItem[] = [
  {
    label: '系统首页',
    key: path.FIRSTITEM,
    icon: <img src={getAssetsFile('menus/home.png')} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '模拟航线',
    key: path.FLEET,
    icon: <img src={getAssetsFile('menus/echarts_heatmap.png')} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '图片上传',
    key: path.FILUP,
    icon: <img src={getAssetsFile('menus/upload.png')} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '文件预览',
    key: path.PDF,
    icon: <img src={getAssetsFile('menus/pdf.png')} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '基础表格',
    key: path.BASE_TABLE,
    icon: <img src={getAssetsFile('menus/baseTable.png')} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '拖拽组件',
    key: path.DRAG,
    icon: <img src={getAssetsFile('menus/drag.png')} alt="加载失败" className="menuIcon"></img>,
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
    icon: <img src={getAssetsFile('menus/I18n.png')} alt="加载失败" className="menuIcon"></img>,
    key: path.I18N,
  },
  {
    label: '流程图',
    key: path.FLOW_CHART,
    icon: <img src={getAssetsFile('menus/flowChart.png')} alt="加载失败" className="menuIcon"></img>,
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
    icon: <img src={getAssetsFile('menus/magnifying.png')} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '智能对话',
    key: path.OPENAI,
    icon: <img src={getAssetsFile('menus/echarts.png')} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '聊天室',
    key: path.CHARTROOM,
    icon: <img src={getAssetsFile('menus/chat.png')} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '后台管理',
    key: path.MANAGE,
    icon: <img src={getAssetsFile('menus/manage.png')} alt="加载失败" className="menuIcon"></img>,
  },
];
