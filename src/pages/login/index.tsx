import { useCallback, useEffect, useRef, useState } from 'react';

import { useLocalStorageState, useTitle } from 'ahooks';
import { Modal } from 'antd';
import cn from 'classnames';
import styled from 'styled-components';

import { ls } from '@/utils/storage';

import Content from './components/content';
import LoginForm from './components/login';
import RegisterForm from './components/register';
import LoginOther from './components/third';

import type { UserInfo } from '@/types';

import { USER_INFO } from '@/settings/localStorage';
import { ACCESS_TOKEN, USER_MENU } from '@/settings/localStorage';
import { GITHUB, BEI_AN } from '@/settings/user';

interface ForwardObject {
  login: (params: UserInfo) => void;
}

const Login = () => {
  useTitle('登录');

  const [userInfo, setUser] = useLocalStorageState<any>(USER_INFO, {
    defaultValue: { userName: '一叶扁舟', passWord: '123456zx' },
  });

  const [isModal, setIsModal] = useState(false);
  const [flag, setFlag] = useState(true);
  const loginRef = useRef<ForwardObject>();

  useEffect(() => {
    ls.remove(ACCESS_TOKEN); //清除token
    ls.remove(USER_MENU); //清除菜单栏
  }, []);

  const onTab = () => {
    setFlag((prev) => !prev);
  };

  const onRegister = useCallback((params: UserInfo) => {
    loginRef.current?.login({
      userName: params.userName,
      passWord: params.passWord,
    });
  }, []);

  const openModal = () => {
    setIsModal(true);
  };

  return (
    <Container>
      <Header>
        <div className="title">PC端管理系统(React版)</div>
        <div className="subTitle">
          已通过Docker+Jenkins+Webhooks实现自动化打包+部署+邮件通知
          <span className="flow" onClick={openModal}>
            （流程图）
          </span>
        </div>
      </Header>
      <Main>
        <Form>
          <div className="tab">
            <div className={cn({ title_active: flag }, 'tab_title')} onClick={onTab}>
              用户登录
            </div>
            <div className={cn({ title_active: !flag }, 'tab_title')} onClick={onTab}>
              用户注册
            </div>
          </div>
          <div style={{ display: flag ? '' : 'none' }}>
            <LoginForm userInfo={userInfo} setUser={setUser} ref={loginRef}></LoginForm>
            <LoginOther></LoginOther>
          </div>
          <div style={{ display: !flag ? '' : 'none' }}>
            <RegisterForm setUser={setUser} onRegister={onRegister}></RegisterForm>
          </div>
        </Form>
      </Main>
      <Footer>
        <a href={GITHUB} target="_blank" className="link" rel="noreferrer">
          项目仓库
        </a>
        <br />
        <span
          className="link"
          onClick={() => {
            window.open(BEI_AN);
          }}
        >
          苏ICP备20022574号-2
        </span>
      </Footer>
      <Modal
        title="流程图"
        wrapClassName="app-modal"
        open={isModal}
        footer={null}
        getContainer={false}
        onCancel={() => setIsModal(false)}
        width="90%"
      >
        <Content />
      </Modal>
    </Container>
  );
};

export default Login;

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: rgba(25, 202, 173, 1);
  /* 解决谷歌记住密码后的默认样式 */
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
    -webkit-text-fill-color: rgba(0, 0, 0, 0.85); /*字体颜色*/
  }
  .app-modal {
    .pic {
      margin-top: 10px;
    }
    .gutter-row {
      display: flex;
    }
    img {
      object-fit: cover;
      width: 400px;
      margin-left: 10px;
    }
  }
`;

export const Header = styled.header`
  width: 100%;
  height: 20vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 50px;
    letter-spacing: 5px;
  }
  .subTitle {
    padding-top: 6px;
  }

  .flow {
    color: #0171f6;
    cursor: pointer;
  }
`;

export const Main = styled.main`
  width: 100%;
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  .link {
    cursor: pointer;
    color: #fff;
  }
`;

export const Form = styled.div`
  width: 400px;
  min-height: 370px;
  padding: 30px;
  background: #fff;
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  box-sizing: border-box;
  .tab {
    width: 190px;
    height: 40px;
    margin: 0 auto;
    display: flex;
    box-sizing: border-box;
    margin-bottom: 30px;
    .tab_title {
      display: inline-block;
      flex: 1;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 16px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #0078dc;
      }
    }
    .title_active {
      color: #0078dc;
      border-bottom: 2px solid #0078dc;
    }
  }
`;
