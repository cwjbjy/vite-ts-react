import { memo } from 'react';

import { Card, Row, Col } from 'antd';
import styled from 'styled-components';

import { MANAGE_NAME, imgUrl } from '@/settings/user';

interface Props {
  userName: string;
  registerTime: string;
  fileName: string;
}

export default memo(function UserCard({ userName = '一叶扁舟', registerTime = '2021-03-21', fileName = '' }: Props) {
  const role = userName === MANAGE_NAME ? '管理员' : '普通用户';

  return (
    <Wrapper>
      <Card hoverable className="user" style={{ marginBottom: 10 }}>
        <Row className="user-top">
          <Col span="12">{fileName && <img src={imgUrl + fileName} className="user-img" alt="加载失败" />}</Col>
          <Col span="12" className="user-area">
            <div className="user-name">{userName}</div>
          </Col>
        </Row>
        <Row className="user-bottom">
          <div className="user-info-list">
            <span>注册时间：</span>
            <span>{registerTime}</span>
          </div>
          <div className="user-info-list">
            <span>权限等级：</span>
            <span>{role}</span>
          </div>
        </Row>
      </Card>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .user {
    font-size: 16px;
    &-top {
      align-items: center;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 2px solid var(--card-border);
      .user-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
      }
      .user-area {
        height: 120px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .user-name {
        font-size: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        text-align: center;
      }
    }
    &-bottom {
      .user-info-list {
        font-size: 14px;
        line-height: 25px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: var(--card-font);
      }
    }
  }
`;
