import { useEffect, RefObject } from 'react';

import * as echarts from 'echarts/core';
import { debounce } from 'lodash-es';

export default function useResize(echartRef: RefObject<HTMLDivElement>) {
  const debounceAutoSize = debounce(() => {
    if (echartRef.current) {
      const echartsInstance = echarts.getInstanceByDom(echartRef.current);
      echartsInstance && echartsInstance.resize();
    }
  }, 300);

  useEffect(() => {
    window.addEventListener('resize', debounceAutoSize, false);
    return () => {
      window.removeEventListener('resize', debounceAutoSize, false);
    };
  }, [debounceAutoSize]);
}
