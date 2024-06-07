import { memo } from 'react';

import { message } from 'antd';
import styled from 'styled-components';

import QQ from '@/assets/images/login/QQ.png';
import WB from '@/assets/images/login/wb.png';
import WX from '@/assets/images/login/wx.png';

export default memo(function LoginOther() {
  const thirdLogin = () => {
    message.warning({
      content: '功能未开发，请使用用户注册',
      className: 'custom-message',
    });
  };

  return (
    <Wrapper>
      <div className="other-acc">
        <h3>第三方账号登录</h3>
      </div>
      <div className="img_list">
        <div className="icon" onClick={thirdLogin}>
          <img src={QQ} alt="加载失败" />
        </div>
        <div className="icon" onClick={thirdLogin}>
          <img src={WB} alt="加载失败" />
        </div>
        <div className="icon" onClick={thirdLogin}>
          <img src={WX} alt="加载失败" />
        </div>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .other-acc {
    width: 65%;
    height: 20px;
    margin: 0 auto 30px auto;
    border-bottom: 1px solid #e6e6e6;
    text-align: center;
    position: relative;
    h3 {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      text-align: center;
      font-size: 14px;
      font-weight: normal;
      color: #999;
      background: #fff;
      position: absolute;
      left: 22%;
      top: 5px;
    }
  }
  .img_list {
    display: flex;
    justify-content: space-around;
    .icon {
      img {
        width: 64px;
        height: 64px;
      }
    }
  }
`;
