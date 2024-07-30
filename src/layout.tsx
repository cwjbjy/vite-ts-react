import { useMemo, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useTitle } from 'ahooks';
import { FloatButton } from 'antd';
import styled from 'styled-components';

import { ls } from '@/utils/storage';

import Header from './components/header/index';
import { menus } from './components/menus/config';
import Menus from './components/menus/index';

import useVersion from '@/hooks/useVersion';

const AppHome = () => {
  useTitle('react管理系统');
  useVersion(); //版本更新提示
  const overFlowRef = useRef(null);

  const userName = useMemo(() => ls.get('userInfo')?.userName, []);

  const newMenus = useMemo(() => {
    const authMenus = ls.get('menu');
    return menus.filter((item) => {
      if (authMenus) {
        if (item && item.key) {
          return authMenus.includes((item.key as string).split('/')[1]);
        }
      }
      return [];
    });
  }, []);

  return (
    <Layout>
      <FloatButton.BackTop visibilityHeight={100} target={() => overFlowRef.current!} />
      <Header userName={userName} />
      <main className="wrapper">
        <aside>
          <Menus menus={newMenus} />
        </aside>
        <article ref={overFlowRef}>
          <Outlet />
        </article>
      </main>
    </Layout>
  );
};

export default AppHome;

const Layout = styled.div`
  body {
    min-width: 1150px;
    overflow-y: hidden;
  }

  aside {
    background-color: var(--background-aside);
  }

  .wrapper {
    display: flex;
    height: calc(100vh - 70px);
  }

  article {
    width: 100%;
    overflow: auto;
    height: inherit;
    background-color: var(--background-main);
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--background-main);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgb(190, 190, 190);
    }
  }

  section {
    padding: 10px;
  }

  /* antd UI修改 */

  .ant-card {
    background-color: var(--card-background) !important;
    color: var(--card-font) !important;
    border: 1px solid var(--card-border) !important;
  }

  .ant-card-body {
    font-size: 16px;
  }

  .ant-progress .ant-progress-text {
    color: var(--card-font) !important;
  }

  .ant-card-head-title {
    color: var(--card-font) !important;
  }

  .ant-table-thead > tr > th {
    background-color: var(--card-background) !important;
    color: var(--card-font) !important;
    font-size: 16px;
  }

  .ant-table table {
    background-color: var(--card-background) !important;
    color: var(--card-font) !important;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background-color: var(--background-main) !important;
  }
`;
