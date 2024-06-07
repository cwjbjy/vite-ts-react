import { useEffect, useRef, memo } from 'react';

import { Chart } from '@/components/layout/chart';

import type { EchartsProps } from '@/types';

import useResize from '@/hooks/useResize';
import { themeColor } from '@/settings/theme';

export default memo(function Bar({ theme }: EchartsProps) {
  const echart = useRef(null);

  useResize(echart);

  useEffect(() => {
    let echartsInstance = window.echarts.getInstanceByDom(echart.current);
    if (!echartsInstance) {
      echartsInstance = window.echarts.init(echart.current);
    }
    echartsInstance.clear();
    echartsInstance.setOption({
      color: ['#3398DB'],
      title: {
        text: '柱状图',
        left: 'center',
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
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: themeColor[theme].font,
            },
          },
          axisTick: {
            show: true, //隐藏X轴刻度
            alignWithLabel: true,
            lineStyle: {
              color: themeColor[theme].font,
            },
          },
          axisLabel: {
            show: true,
            color: themeColor[theme].font,
          },
          nameTextStyle: {
            color: themeColor[theme].font,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: themeColor[theme].font,
            },
          },
          axisTick: {
            show: true, //隐藏X轴刻度
            lineStyle: {
              color: themeColor[theme].font,
            },
          },
          axisLabel: {
            show: true,
            color: themeColor[theme].font,
          },
          nameTextStyle: {
            color: themeColor[theme].font,
          },
        },
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    });
  }, [theme]);

  return <Chart ref={echart}></Chart>;
});
