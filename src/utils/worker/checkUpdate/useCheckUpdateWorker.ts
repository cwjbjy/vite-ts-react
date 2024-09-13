import { useEffect, useRef } from 'react';

import { useMemoizedFn } from 'ahooks';

import { sharedWorkerInstance } from '../sharedWorkerInstance';

//发送消息的类型
enum MessageType {
  INIT = 'init', //初始化，用于传参
  START = 'start', //开启轮询，检测Etag版本
  STOP = 'stop', //停止轮询
  CLOSE = 'close', //关闭或刷新页面时，关闭SharedWorker的端口
}

//SharedWorker接收到MessageType类型事件后，处理后对应的事件返回，以reflect开头
export enum ReflectMessageType {
  REFLECT_GET_ETAG = 'reflectGetEtag',
}

// 用户消息推送Websocket连接
export default function useSharedWorker(url: string, options: WorkerOptions) {
  const workerRef = useRef<SharedWorker>();

  const sendMessage = useMemoizedFn((type: MessageType, data?: any) => {
    workerRef.current?.port.postMessage({
      type,
      ...data,
    });
  });

  const init = useMemoizedFn(() => {
    sendMessage(MessageType.INIT);
  });

  const start = useMemoizedFn(() => {
    sendMessage(MessageType.START);
  });

  const stop = useMemoizedFn(() => {
    sendMessage(MessageType.STOP);
  });

  const close = useMemoizedFn(() => {
    sendMessage(MessageType.CLOSE);
  });

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = sharedWorkerInstance(url, options);
      init();
    }

    window.addEventListener('beforeunload', close, false);

    window.addEventListener('unload', close);

    return () => {
      window.removeEventListener('beforeunload', close);
      window.removeEventListener('unload', close);
    };
  }, [close, init, options, url]);

  return { start, stop, init, workerRef };
}
