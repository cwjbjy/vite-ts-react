import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import cn from 'classnames';
import { produce } from 'immer';
import styled from 'styled-components';

import { menus } from '../menus/config';

interface Tag {
  name: string | undefined;
  pathname: string;
  state: Record<string, any>;
  key: string;
}

const Tags = () => {
  const [tagsList, setTagsList] = useState<Tag[]>([]);
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    const isExist = tagsList.some((item) => {
      return item.pathname === location.pathname;
    });

    const isFind: any = menus.find((item) => {
      return item?.key === location.pathname;
    });
    if (!isExist) {
      if (tagsList.length >= 8) {
        setTagsList(
          produce((draft) => {
            draft.shift();
          }),
        );
      }
      setTagsList(
        produce((draft) => {
          draft.push({
            name: isFind?.label,
            key: location.key,
            pathname: location.pathname,
            state: location.state,
          });
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const closeTags = (index: number) => {
    setTagsList(
      produce((draft) => {
        draft.splice(index, 1);
      }),
    );
  };

  return (
    <Wrapper>
      <ul>
        {tagsList.map((item, index) => (
          <li key={item.key} className={cn('li', { active: item.pathname === location.pathname })}>
            <span
              className="li-title"
              onClick={() => {
                // console.log('item.pathname', item.pathname);
                navigation(item.pathname);
              }}
            >
              {item.name}
            </span>
            <span className="li-icon" onClick={() => closeTags(index)}>
              <i className="iconfont icon-guanbi"></i>
            </span>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Tags;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #fff;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .li {
    display: inline-flex;
    margin: 3px 5px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 23px;
    padding: 0 12px;
    border: 1px solid #e9eaec;
    color: #666;
  }
  .li.active {
    background: #409eff;
    border: 1px solid #409eff;
    color: #666;
    .li-title {
      color: #fff;
    }
    .iconfont {
      color: #fff;
    }
  }
  .li-title {
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    cursor: pointer;
  }
  .li-icon {
    cursor: pointer;
    .iconfont {
      font-size: 12px;
    }
  }
  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 1px;
  }
`;
