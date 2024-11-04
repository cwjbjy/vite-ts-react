import { useCallback, useEffect, useRef } from 'react';

import { notification, Button } from 'antd';

import useCheckUpdateWorker, { ReflectMessageType } from './useCheckUpdateWorker';

const useVersion = () => {
  const forbidUpdate = useRef(false);
  const versionRef = useRef<string>();
  const { start, stop, refresh, workerRef } = useCheckUpdateWorker(
    new URL('../utils/checkUpdate.worker.js', import.meta.url).href,
    {
      name: 'updateModal',
      type: 'module',
    },
  );

  const openNotification = useCallback(() => {
    forbidUpdate.current = true;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          //通知其他tab页刷新
          refresh();
          //刷新页面
          window.location.reload();
        }}
      >
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
  }, [refresh]);

  const handlePageUpdateCheck = useCallback(
    (etag: string) => {
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
    },
    [openNotification],
  );

  //关闭检测
  const stopPollingPageUpdate = useCallback(() => {
    stop();
  }, [stop]);

  //开启检测
  const startPollingPageUpdate = useCallback(() => {
    //开发环境不进行版本更新提示
    // if (process.env.NODE_ENV === 'development') return;
    stopPollingPageUpdate();
    //重新计时
    start();
  }, [start, stopPollingPageUpdate]);

  const handleVisibilitychange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      startPollingPageUpdate();
    } else {
      stopPollingPageUpdate();
    }
  }, [startPollingPageUpdate, stopPollingPageUpdate]);

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
          case ReflectMessageType.REFLECT_REFRESH:
            //其他tab页面手动更新，同步更新
            window.location.reload();
            break;
          default:
            break;
        }
      };
    }
  }, [handlePageUpdateCheck, workerRef]);
};

export default useVersion;
