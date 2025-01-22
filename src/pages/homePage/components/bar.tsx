import { memo, useEffect, useRef, useCallback } from 'react';

import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

import { Chart } from '@/components/layout/chart';

import type { EchartsProps } from '@/types';

import useResize from '@/hooks/useResize';
import { themeColor } from '@/settings/theme';

// 注册必须的组件
echarts.use([GridComponent, TooltipComponent, TitleComponent, BarChart, CanvasRenderer]);

export default memo(function Bar({ theme, model }: EchartsProps) {
  const echart = useRef(null);

  const initial = useCallback(() => {
    let echartsInstance = echarts.getInstanceByDom(echart.current as unknown as HTMLDivElement);
    if (!echartsInstance) {
      echartsInstance = echarts.init(echart.current);
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
