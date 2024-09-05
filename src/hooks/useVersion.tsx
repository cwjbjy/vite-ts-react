import { useCallback, useEffect, useRef } from 'react';

import { useMemoizedFn } from 'ahooks';
import { notification, Button } from 'antd';

const getETag = async () => {
  const response = await fetch(window.location.origin, {
    method: 'HEAD',
    cache: 'no-cache',
  });
  return response.headers.get('etag') || response.headers.get('last-modified');
};

const useVersion = (delay = 30000) => {
  const timer = useRef<string | number | NodeJS.Timeout | undefined>();
  const uploadNotificationShow = useRef(false);
  const versionRef = useRef<string>();
  const firstReqRef = useRef(true);

  const close = useCallback(() => {
    uploadNotificationShow.current = false;
  }, []);

  const onRefresh = useCallback(() => {
    close();
    // 刷新页面
    window.location.reload();
  }, [close]);

  const openNotification = useCallback(() => {
    uploadNotificationShow.current = true;
    const btn = (
      <Button type="primary" size="small" onClick={onRefresh}>
        确认更新
      </Button>
    );
    notification.open({
      message: '版本更新提示',
      description: '检测到系统当前版本已更新，请刷新后使用。',
      btn,
      duration: 0,
      onClose: close,
    });
  }, [close, onRefresh]);

  const getHash = useCallback(() => {
    //开发环境不进行版本更新提示
    // if (process.env.NODE_ENV === 'development') return;
    if (!uploadNotificationShow.current) {
      // 在 js 中请求首页地址，这样不会刷新界面，也不会跨域
      getETag().then((etag) => {
        if (etag) {
          const version = versionRef.current;
          if (!version) {
            versionRef.current = etag;
          } else if (version === etag) {
            // eslint-disable-next-line no-console
            console.log('最新版本');
          } else {
            // 版本更新，弹出提示
            openNotification();
          }
        }
      });
    }
  }, [openNotification]);

  //开启检测
  const startPollingPageUpdate = useMemoizedFn(() => {
    //第一次立即执行
    if (firstReqRef.current) {
      firstReqRef.current = false;
      getHash();
    }
    stopPollingPageUpdate();
    timer.current = setInterval(getHash, delay);
  });

  const stopPollingPageUpdate = useMemoizedFn(() => {
    clearInterval(timer.current);
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
};

export default useVersion;
