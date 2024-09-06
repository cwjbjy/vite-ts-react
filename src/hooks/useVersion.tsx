import { useCallback, useEffect, useRef } from 'react';

import { useMemoizedFn } from 'ahooks';
import { notification, Button } from 'antd';

import useCheckUpdateWorker, { ReflectMessageType } from '../utils/worker/checkUpdate/useCheckUpdateWorker';

const useVersion = () => {
  const forbidUpdate = useRef(false);
  const versionRef = useRef<string>();
  const firstReqRef = useRef(true);
  const { start, stop, getEtag, workerRef } = useCheckUpdateWorker(
    new URL('../utils/worker/checkUpdate/checkUpdateWorker.js', import.meta.url),
    {
      name: 'updateModal',
    },
  );

  const openNotification = useCallback(() => {
    forbidUpdate.current = true;
    const btn = (
      <Button type="primary" size="small" onClick={() => window.location.reload()}>
        确认更新
      </Button>
    );
    notification.open({
      message: '版本更新提示',
      description: '检测到系统当前版本已更新，请刷新后使用。',
      btn,
      duration: 0,
      onClose: () => (forbidUpdate.current = false),
    });
  }, []);

  const handlePageUpdateCheck = useMemoizedFn((etag) => {
    if (etag) {
      const version = versionRef.current;
      if (!version) {
        versionRef.current = etag;
      } else if (version === etag) {
        // eslint-disable-next-line no-console
        console.log('最新版本');
      } else {
        // 版本更新，弹出提示，forbidUpdate防止重复弹出
        !forbidUpdate.current && openNotification();
      }
    }
  });

  //开启检测
  const startPollingPageUpdate = useMemoizedFn(() => {
    //开发环境不进行版本更新提示
    // if (process.env.NODE_ENV === 'development') return;
    //第一次立即执行
    if (firstReqRef.current) {
      firstReqRef.current = false;
      getEtag();
    }
    stopPollingPageUpdate();
    start();
  });

  const stopPollingPageUpdate = useMemoizedFn(() => {
    stop();
  });

  const handleVisibilitychange = useMemoizedFn(() => {
    if (document.visibilityState === 'visible') {
      startPollingPageUpdate();
    } else {
      stopPollingPageUpdate();
    }
  });

  useEffect(() => {
    //初始化时，不会触发visibilitychange事件，先主动开启轮询检测
    startPollingPageUpdate();
    document.addEventListener('visibilitychange', handleVisibilitychange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilitychange);
    };
  }, [handleVisibilitychange, startPollingPageUpdate]);

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.port.onmessage = (e) => {
        const data = e.data || {};
        switch (data.type) {
          case ReflectMessageType.REFLECT_GET_ETAG:
            handlePageUpdateCheck(data.data);
            break;
          default:
            break;
        }
      };
    }
  }, [handlePageUpdateCheck, workerRef]);
};

export default useVersion;
