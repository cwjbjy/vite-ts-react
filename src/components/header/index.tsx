import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CaretDownOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Dropdown } from 'antd';
import styled from 'styled-components';

import { getImage } from '@/apis/user';

import type { ThemeType } from '@/types';
import type { MenuProps } from 'antd';

import { LOGIN } from '@/settings/routerMap';
import { GITHUB, imgUrl } from '@/settings/user';
import useFileStore from '@/store/file';
import useThemeStore from '@/store/theme';

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

export default memo(function Header({ userName }: { userName: string }) {
  const { fileName, setFileName } = useFileStore();
  const { theme, changeTheme } = useThemeStore();
  const navigation = useNavigate();

  useRequest(getImage, {
    ready: !!userName,
    defaultParams: [{ userName }],
    onSuccess: (res) => {
      setFileName(res.data[0].photo);
    },
  });

  const onChangeTheme = useCallback(
    (e: { key: string }) => {
      const theme = e.key as ThemeType;
      changeTheme(theme);
      window.document.documentElement.setAttribute('data-theme', theme);
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

  useEffect(() => {
    window.document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Wrapper>
      <div className="left">
        <span style={{ marginLeft: 10 }}>PC端后台管理系统(React版)</span>
      </div>
      <div className="right">
        <Dropdown
          menu={{ items: themes, selectable: true, onClick: onChangeTheme, defaultSelectedKeys: [theme] }}
          className="user-drop"
        >
          <i className="iconfont icon-zhuti_tiaosepan_o"></i>
        </Dropdown>
        <Dropdown menu={{ items: list, onClick: onUserClick }} className="user-drop">
          <div className="userImage">
            {fileName && <img src={imgUrl + fileName} className="user-img" alt="加载失败" />}
            <span style={{ marginRight: 5 }}>
              <span style={{ marginRight: 2 }}>{userName}</span>
              <CaretDownOutlined />
            </span>
          </div>
        </Dropdown>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.header`
  display: flex;
  height: 70px;
  background-color: var(--background-header);
  color: var(--font-primary);
  cursor: pointer;
  .left {
    width: 50%;
    line-height: 70px;
    font-size: 24px;
    letter-spacing: 2px;
    text-indent: 10px;
    display: inline-flex;
  }
  .right {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .iconfont {
      font-size: 30px;
      color: var(--icon-font);
    }
    .user-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      padding: 5px;
      object-fit: cover;
    }
    .user-drop {
      padding: 5px;
    }
    .userImage {
      display: inline-flex;
      > span {
        line-height: 50px;
      }
    }
  }
  .ant-dropdown-menu-item,
  .ant-dropdown-menu-submenu-title {
    text-align: center;
    &:hover {
      color: #66b1ff;
    }
  }
`;
