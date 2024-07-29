import { memo, useEffect, useRef, useCallback } from 'react';

import { Chart } from '@/components/layout/chart';

import type { EchartsProps } from '@/types';

import useResize from '@/hooks/useResize';
import { themeColor } from '@/settings/theme';

export default memo(function Bar({ theme, model }: EchartsProps) {
  const echart = useRef(null);

  const initial = useCallback(() => {
    let echartsInstance = window.echarts.getInstanceByDom(echart.current);
    if (!echartsInstance) {
      echartsInstance = window.echarts.init(echart.current);
    }
    echartsInstance.clear();
    echartsInstance.setOption({
      color: ['#2d8cf0'],
      title: {
        text: '销售图表',
        textStyle: {
          color: themeColor[theme].font,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        bottom: '8%',
      },
      xAxis: {
        data: model?.xAxis || [],
        axisLabel: {
          show: true,
          color: themeColor[theme].font,
        },
      },
      yAxis: {
        axisLabel: {
          show: true,
          color: themeColor[theme].font,
        },
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: model?.series || [],
        },
      ],
    });
  }, [theme, model]);

  useResize(echart);

  useEffect(() => {
    model && initial();
  }, [model, initial]);

  return <Chart ref={echart}></Chart>;
});
