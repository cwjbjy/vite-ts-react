import { memo } from 'react';

import { Card, Row, Col } from 'antd';

import { MANAGE_NAME } from '@/settings/user';
import './userCard.scss';
interface Props {
  userName: string;
  registerTime: string;
  fileName: string;
}

const img_url = import.meta.env.VITE_APP_IMG_URL;

const UserCard = memo(function UserCard({ userName = '一叶扁舟', registerTime = '2021-03-21', fileName = '' }: Props) {
  const role = userName === MANAGE_NAME ? '管理员' : '普通用户';

  return (
    <Card hoverable className="user" style={{ marginBottom: 10 }}>
      <Row className="user-top">
        <Col span="12">{fileName && <img src={`${img_url}${fileName}`} className="user-img" alt="加载失败" />}</Col>
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
  );
});

export default UserCard;
