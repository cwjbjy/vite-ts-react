import { useCallback, useEffect, useRef } from 'react';

import { notification, Button } from 'antd';

const getETag = async () => {
  const response = await fetch(window.location.origin, {
    cache: 'no-cache',
  });
  return response.headers.get('etag') || response.headers.get('last-modified');
};

const useVersion = () => {
  const timer = useRef<NodeJS.Timer>();
  const uploadNotificationShow = useRef(false);

  const close = useCallback(() => {
    uploadNotificationShow.current = false;
  }, []);

  const onRefresh = useCallback(
    (new_hash: string) => {
      close();
      // 更新localStorage版本号信息
      window.localStorage.setItem('vs', new_hash);
      // 刷新页面
      window.location.reload();
    },
    [close],
  );

  const openNotification = useCallback(
    (new_hash: string) => {
      uploadNotificationShow.current = true;
      const btn = (
        <Button type="primary" size="small" onClick={() => onRefresh(new_hash)}>
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
    },
    [close, onRefresh],
  );

  const getHash = useCallback(() => {
    if (!uploadNotificationShow.current) {
      // 在 js 中请求首页地址，这样不会刷新界面，也不会跨域
      getETag().then((res) => {
        const new_hash = res;
        const old_hash = localStorage.getItem('vs');
        if (!old_hash && new_hash) {
          // 如果本地没有，则存储版本信息
          window.localStorage.setItem('vs', new_hash);
        } else if (new_hash && new_hash !== old_hash) {
          // 本地已有版本信息，但是和新版不同：版本更新，弹出提示
          openNotification(new_hash);
        }
      });
    }
  }, [openNotification]);

  useEffect(() => {
    getHash();
    timer.current = setInterval(() => {
      getHash();
      // 1h检测一次
    }, 3600000);
    return () => {
      clearInterval(timer.current);
    };
  }, [getHash]);
};

export default useVersion;
