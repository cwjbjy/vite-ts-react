import { useMemo, useRef } from 'react';
import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useTitle } from 'ahooks';
import { FloatButton } from 'antd';

import FullScreenLoading from '@/components/layout/loading';

import Header from '../components/header/index';
import { menus } from '../components/menus/config';
import Menus from '../components/menus/index';

import { ls } from '@/utils/storage';

import useVersion from '@/hooks/useVersion';
import { ACCESS_TOKEN } from '@/settings/localStorage';
import { LOGIN } from '@/settings/routerMap';
import useThemeStore from '@/store/theme';

import './index.scss';

const AppHome = () => {
  useTitle('react管理系统');
  useVersion(); //版本更新提示
  const overFlowRef = useRef(null);

  const { theme } = useThemeStore();
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

  if (!ls.get(ACCESS_TOKEN)) {
    return <Navigate to={LOGIN} replace />;
  }

  return (
    <>
      <FloatButton.BackTop visibilityHeight={100} target={() => overFlowRef.current!} />
      <div className={theme}>
        <Header userName={userName} />
        <main className="wrapper">
          <aside>
            <Menus menus={newMenus} />
          </aside>
          <article ref={overFlowRef}>
            <Suspense fallback={<FullScreenLoading />}>
              <Outlet />
            </Suspense>
          </article>
        </main>
      </div>
    </>
  );
};

export default AppHome;
