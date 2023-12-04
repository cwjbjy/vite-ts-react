import { message } from 'antd';

import WebsocketClass from './websocket';

interface Message {
  type: string;
  text?: string;
}

interface User {
  type: string;
  name: string;
  image: string;
}

interface OpenProps {
  params: User;
  closeCallBack: () => void;
}

/**
 * 聊天室服务
 */

class Chat {
  private WSInstance: WebsocketClass | null;
  constructor() {
    this.WSInstance = null;
  }
  //加入聊天室
  open({ params, closeCallBack }: OpenProps) {
    this.WSInstance = new WebsocketClass({ closeCallBack });
    this.WSInstance.connect(params)
      .then(() => {
        message.success('连接成功');
      })
      .catch(() => {
        message.error('网络错误，请稍后重试');
      });
  }
  //发送消息
  sendMessage(params: Message) {
    if (this.WSInstance) {
      this.WSInstance.sendMessage({ msg: params });
    }
  }
  //关闭消息
  close(params: Message) {
    if (this.WSInstance) {
      this.WSInstance.close(params).then(() => {
        message.success('关闭成功');
      });
    }
  }
}

const insService = new Chat();

export default insService;
