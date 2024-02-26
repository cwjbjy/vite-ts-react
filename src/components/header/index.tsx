import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { CaretDownOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Dropdown } from 'antd';

import { ls } from '@/utils/storage';

import { getImage } from '@/apis/user';

import type { ThemeType } from '@/types';
import type { MenuProps } from 'antd';

import { THEME } from '@/settings/localStorage';
import { LOGIN } from '@/settings/routerMap';
import { GITHUB } from '@/settings/user';
import useFileStore from '@/store/file';
import useThemeStore from '@/store/theme';

import './index.scss';

interface Props {
  userName: string;
}

const themes: MenuProps['items'] = [
  {
    key: 'default',
    label: '简约灰',
  },
  {
    key: 'blue',
    label: '胖次蓝',
  },
  {
    key: 'black',
    label: '夜间模式',
  },
];

const list: MenuProps['items'] = [
  {
    key: '0',
    label: (
      <a target="_blank" rel="noopener noreferrer" href={GITHUB}>
        项目仓库
      </a>
    ),
  },
  {
    key: '1',
    label: '退出登录',
  },
];

const Header = memo(function Header({ userName }: Props) {
  const { fileName, setFileName } = useFileStore();
  const { changeTheme } = useThemeStore();
  const navigation = useNavigate();

  useRequest(() => getImage({ user_name: userName }), {
    ready: !!userName,
    onSuccess: (res) => {
      setFileName(res.data[0].photo);
    },
  });

  const onChangeTheme = useCallback(
    (e: { key: string }) => {
      const theme = e.key as ThemeType;
      changeTheme(theme);
      window.document.documentElement.setAttribute('data-theme', theme);
      ls.set(THEME, theme);
    },
    [changeTheme],
  );

  const onUserClick = useCallback(
    (e: { key: string }) => {
      if (e.key === '1') {
        navigation(LOGIN);
      }
    },
    [navigation],
  );

  const defaultSelectedKeys = useMemo(() => ls.get(THEME) || 'default', []);

  useEffect(() => {
    window.document.documentElement.setAttribute('data-theme', ls.get(THEME));
  }, []);

  return (
    <header className="header">
      <div className="header_left">
        <span style={{ marginLeft: 10 }}>PC端后台管理系统(React版)</span>
      </div>
      <div className="header_right">
        <Dropdown
          menu={{ items: themes, selectable: true, onClick: onChangeTheme, defaultSelectedKeys: [defaultSelectedKeys] }}
          className="user-drop"
        >
          <i className="iconfont icon-zhuti_tiaosepan_o"></i>
        </Dropdown>
        <Dropdown menu={{ items: list, onClick: onUserClick }} className="user-drop">
          <div className="userImage">
            {fileName && (
              <img src={`${import.meta.env.VITE_APP_IMG_URL}${fileName}`} className="user-img" alt="加载失败" />
            )}
            <span style={{ marginRight: 5 }}>
              <span style={{ marginRight: 2 }}>{userName}</span>
              <CaretDownOutlined />
            </span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
});

export default Header;
