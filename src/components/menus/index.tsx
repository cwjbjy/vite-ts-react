import { memo, useEffect, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Menu } from 'antd';
import styled from 'styled-components';

import { MenuItem } from './config';

import type { MenuProps } from 'antd';

interface Props {
  menus: MenuItem[];
}

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

export default memo(function Menus({ menus }: Props) {
  const location = useLocation();
  const navigation = useNavigate();

  const [selectedKey, setselectedKeys] = useState(['']);

  useEffect(() => {
    setselectedKeys([location.pathname]);
  }, [location]);

  const levelKeys = getLevelKeys(menus as LevelKeysProps[]);

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const onClick = useCallback(
    (e: { key: string }) => {
      navigation(e.key);
    },
    [navigation],
  );

  return (
    <Wrapper>
      <Menu
        style={{ width: 256 }}
        selectedKeys={selectedKey}
        openKeys={stateOpenKeys}
        mode="inline"
        className="Menu"
        items={menus}
        onOpenChange={onOpenChange}
        onClick={onClick}
      ></Menu>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0;
    height: 8px;
  }

  .Menu {
    background-color: var(--background-aside);
    color: var(--font-primary) !important;
  }

  .ant-menu-item {
    display: flex !important;
    align-items: center;
  }

  .ant-menu-submenu-title {
    display: flex !important;
    align-items: center;
  }

  /* 菜单样式 */

  .ant-menu-item {
    // background-color: var(--background-aside);
    color: var(--font-primary) !important;
    &:hover {
      color: rgb(255, 208, 75) !important;
    }
  }

  .ant-menu-item:active {
    background-color: var(--font-highlight) !important;
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: var(--font-highlight) !important;
    color: rgb(255, 208, 75) !important;
    > span {
      > a {
        background-color: var(--font-highlight);
      }
    }
    > a {
      background-color: var(--font-highlight);
    }
  }

  .ant-menu-item-selected,
  .ant-menu-item-selected:hover {
    color: rgb(255, 208, 75) !important;
  }

  /* 多级菜单样式 */

  .ant-menu-submenu-expand-icon,
  .ant-menu-submenu-arrow {
    color: #909399 !important;
  }

  .ant-menu-submenu > .ant-menu {
    background-color: var(--background-aside);
  }

  .ant-menu-submenu-title {
    > span {
      margin-left: 10px;
      color: var(--font-primary) !important;
    }
    &:hover {
      color: #fff !important;
    }
    &:active {
      background-color: var(--font-highlight) !important;
    }
  }

  .ant-menu-submenu-selected {
    color: #fff !important;
    &:hover {
      color: #fff !important;
    }
  }

  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: none !important;
  }

  .menuIcon {
    width: 18px;
    height: 18px;
  }
`;
