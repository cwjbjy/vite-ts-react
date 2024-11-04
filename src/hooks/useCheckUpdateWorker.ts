import { useEffect, useRef, useCallback } from 'react';

//发送消息的类型
enum MessageType {
  START = 'start', //开启轮询，检测Etag版本
  STOP = 'stop', //停止轮询
  CLOSE = 'close', //关闭或刷新页面时，关闭SharedWorker的端口
  REFRESH = 'refresh', //主动刷新
}

//SharedWorker接收到MessageType类型事件后，处理后对应的事件返回，以reflect开头
export enum ReflectMessageType {
  REFLECT_GET_ETAG = 'reflectGetEtag',
  REFLECT_REFRESH = 'reflectRefresh',
}

// 用户消息推送Websocket连接
export default function useSharedWorker(url: string, options: WorkerOptions) {
  const workerRef = useRef<SharedWorker>();

  const sendMessage = useCallback((type: MessageType, data?: any) => {
    workerRef.current?.port.postMessage({
      type,
      ...data,
    });
  }, []);

  const start = useCallback(() => {
    sendMessage(MessageType.START);
  }, [sendMessage]);

  const stop = useCallback(() => {
    sendMessage(MessageType.STOP);
  }, [sendMessage]);

  const close = useCallback(() => {
    sendMessage(MessageType.CLOSE);
  }, [sendMessage]);

  const refresh = useCallback(() => {
    sendMessage(MessageType.REFRESH);
  }, [sendMessage]);

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = new SharedWorker(url, options);
    }

    window.addEventListener('beforeunload', close);

    return () => {
      window.removeEventListener('beforeunload', close);
    };
  }, [close, options, url]);

  return { start, stop, refresh, workerRef };
}
