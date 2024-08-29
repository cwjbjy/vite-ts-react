import { useRef, useEffect, useState, useMemo } from 'react';

import { Button, message, Input, Card, Modal } from 'antd';
import styled from 'styled-components';

import socket, { TYPE } from '@/utils/socket';
import { ls } from '@/utils/storage';

import showImage from '@/assets/images/chartRoom/chatShowV2.0.png';
import rootImage from '@/assets/images/chartRoom/root.png';
import { BUS_WS } from '@/settings/bus';
import { imgUrl } from '@/settings/user';
import useFileStore from '@/store/file';

interface Message {
  name: string;
  image: string;
  text: string;
}

const ChatRoomSocket = () => {
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalImage, setIsModalImage] = useState(false);
  const [input, setInput] = useState('');
  const [connectFlag, setConnectFlag] = useState(false);
  const [closeFlag, setCloseFlag] = useState(true);
  const [latestMessage, setLatestMessage] = useState();
  const [firstConnect, setFirstConnect] = useState(true);

  const { fileName } = useFileStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userName = ls.get('userInfo')?.userName;

  const user = useMemo(
    () => ({
      name: userName,
      image: `${imgUrl}${fileName}`,
    }),
    [fileName, userName],
  );

  useEffect(() => {
    window.eventBus.on(BUS_WS, (data: any) => {
      setLatestMessage(data);
    });
    return () => {
      window.eventBus.off(BUS_WS);
    };
  }, []);

  useEffect(() => {
    if (latestMessage) {
      setMessageHistory((prev) => prev.concat(latestMessage));
    }
  }, [latestMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageHistory]);

  const connect = () => {
    socket.connect(user);
    setConnectFlag(true);
    setCloseFlag(false);
    setFirstConnect(false);
  };

  const reconnect = () => {
    socket.reconnect(user);
    setConnectFlag(true);
    setCloseFlag(false);
  };

  const close = () => {
    socket.sendMessage(TYPE.REMOVE);
    socket.close();
    setMessageHistory([]);
    setConnectFlag(false);
    setCloseFlag(true);
  };

  const send = () => {
    if (!connectFlag) {
      message.error('请先连接');
      return;
    }
    if (input === '') return;
    socket.sendMessage(TYPE.MESSAGE, {
      text: input,
    });
    setInput('');
  };

  return (
    <Wrapper>
      <Card hoverable>
        <Header>
          <Button type="primary" onClick={firstConnect ? connect : reconnect} disabled={connectFlag}>
            📞 连接
          </Button>
          <Button type="primary" onClick={close} disabled={closeFlag}>
            ❌ 关闭
          </Button>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            使用说明
          </Button>
          <Button type="primary" onClick={() => setIsModalImage(true)}>
            查看效果图
          </Button>
        </Header>

        <div className="chat">
          <div className="chat-content">
            <div>
              {messageHistory.length > 0 &&
                messageHistory.map((item, index) => (
                  <dl key={index} className={item.name === userName ? 'info-right' : 'info-left'}>
                    <dt>
                      {item.image ? (
                        <img src={item.image} className="headPortrait" alt="图片加载失败" />
                      ) : (
                        <img src={rootImage} className="headPortrait" alt="加载失败" />
                      )}
                    </dt>
                    <dd>
                      <div className="txt-name">{item.name}</div>
                      <div>
                        <span className="txt-content">{item.text}</span>
                      </div>
                    </dd>
                  </dl>
                ))}
            </div>
            <div ref={messagesEndRef} />
          </div>
          <div className="chart-button">
            <Input placeholder="请输入" value={input} onChange={(e) => setInput(e.target.value)} onPressEnter={send} />
            <Button type="primary" onClick={send}>
              发送
            </Button>
          </div>
        </div>
      </Card>
      <Modal title="使用说明" open={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
        <div>1.点击连接；</div>
        <div>2.使用另一个浏览器，登录另一个账户，点击连接；或者使用另一台电脑登录另一个账户</div>
        <div>3.输入消息，点击发送或者回车发送；</div>
      </Modal>
      <Modal
        title="效果图"
        wrapClassName="app-img-modal"
        open={isModalImage}
        footer={null}
        getContainer={false}
        onCancel={() => setIsModalImage(false)}
        width="90%"
      >
        <img src={showImage} alt="加载失败" className="pic" />
      </Modal>
    </Wrapper>
  );
};

export default ChatRoomSocket;

const Header = styled.div`
  margin-bottom: 20px;
  .ant-btn {
    margin-right: 10px;
  }
`;

const Wrapper = styled.div`
  padding: 10px;
  .pic {
    width: 100%;
    height: auto;
  }
  .app-img-modal {
    .ant-modal-body {
      height: 76vh;
      overflow: auto;
    }
  }

  .chat {
    border: 1px solid #000;
    box-sizing: border-box;
    width: 353px;
    height: 524px;
    position: relative;
  }
  .chat-content {
    height: 480px;
    overflow-y: auto;
    padding: 10px;
    .txt-name {
      margin-bottom: 10px;
    }
    .txt-content {
      word-break: break-all;
      background-color: #0083ff;
      border-radius: 3px;
      padding: 5px 12px;
      color: #fff;
    }
    .info-right {
      text-align: right;
      padding-right: 47px;
      dt {
        right: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    .info-left {
      text-align: left;
      padding-left: 47px;
      dt {
        left: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
    dl {
      position: relative;
      margin-bottom: 20px;
      dt {
        width: 60px;
        height: 60px;
        position: absolute;
        top: 0;
      }
    }
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
  .headPortrait {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .chart-button {
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
  }
`;
