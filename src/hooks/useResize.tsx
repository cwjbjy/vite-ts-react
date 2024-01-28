import { useEffect, RefObject } from 'react';

import { debounce } from '@/utils/share';

export default function useResize(echartRef: RefObject<HTMLDivElement>) {
  const debounceAutoSize = debounce(() => {
    const echartsInstance = window.echarts?.getInstanceByDom(echartRef.current);
    echartsInstance && echartsInstance.resize();
  }, 300);

  useEffect(() => {
    window.addEventListener('resize', debounceAutoSize, false);
    return () => {
      window.removeEventListener('resize', debounceAutoSize, false);
    };
  }, [debounceAutoSize]);
}
