import { useEffect, useRef, memo } from 'react';

import { Chart } from '@/components/layout/chart';

import type { EchartsProps } from '@/types';

import useResize from '@/hooks/useResize';
import { themeColor } from '@/settings/theme';

export default memo(function Cylinder({ theme }: EchartsProps) {
  const echart = useRef(null);

  useResize(echart);

  useEffect(() => {
    let echartsInstance = window.echarts.getInstanceByDom(echart.current);
    if (!echartsInstance) {
      echartsInstance = window.echarts.init(echart.current);
    }
    echartsInstance.clear();
    echartsInstance.setOption({
      color: ['#70a1ff', '#70a1ff'],
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow',
        },
      },
      title: {
        text: '圆柱图',
        textStyle: {
          color: themeColor[theme].font,
        },
        x: 'center',
        // y: 'center',
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
          splitLine: {
            show: true,
            lineStyle: {
              color: themeColor[theme].font,
              type: 'dashed',
              opacity: 0.5,
            },
          },
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
          type: 'pictorialBar',
          symbolSize: [20, 10],
          symbolOffset: [0, -5],
          symbolPosition: 'end',
          z: 12,
          label: {
            normal: {
              show: true,
              position: 'top',
              // "formatter": "{c}%"
            },
          },
          data: [60, 70, 80, 90, 60, 70, 80],
        },
        {
          type: 'pictorialBar',
          symbolSize: [20, 10],
          symbolOffset: [0, 5],
          z: 12,
          data: [60, 70, 80, 90, 60, 70, 80],
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: ['#5352ed'],
              opacity: 0.7,
            },
          },
          barWidth: 20,
          data: [60, 70, 80, 90, 60, 70, 80],
          markLine: {
            silent: true,
            symbol: 'none',
            label: {
              position: 'middle',
            },
            data: [
              {
                name: '目标值',
                yAxis: 80,
                lineStyle: {
                  color: '#ffc832',
                },
                label: {
                  position: 'end',
                  formatter: '{b}\n {c}',
                },
              },
            ],
          },
        },
      ],
    });
  }, [theme]);

  return <Chart ref={echart}></Chart>;
});
