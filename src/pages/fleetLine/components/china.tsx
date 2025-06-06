import { useEffect, useRef } from 'react';

import { ScatterChart, EffectScatterChart, LinesChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GeoComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import type { ApiData } from '@/settings/map';

import geoJson from '@/assets/map/china.json';
import useResize from '@/hooks/useResize';
import { geoCoordMap, apiData } from '@/settings/map';
echarts.use([
  TooltipComponent,
  TitleComponent,
  GeoComponent,
  CanvasRenderer,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
  UniversalTransition,
]);

const buildLines = function (data: ApiData, geoCoordMap: Record<any, number[]>) {
  const planePath =
    'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
  const color = [
    '#eccc68',
    '#ff7f50',
    '#ff6b81',
    '#ffa502',
    '#ff6348',
    '#ff4757',
    '#7bed9f',
    '#70a1ff',
    '#5352ed',
    '#2ed573',
    '#1e90ff',
    '#3742fa',
  ]; //航线的颜色
  return data.map((item, index) => ({
    name: item.airName,
    type: 'lines',
    zlevel: index + 3,
    symbol: ['none', 'arrow'],
    symbolSize: 10,
    label: {
      show: false,
    },
    effect: {
      show: true,
      period: item.speed, //动画时间
      trailLength: 0.1, //给飞机尾部加特效
      symbol: planePath,
      symbolSize: 15,
      delay: item.delay,
    },
    lineStyle: {
      color: color[index],
      width: 2,
      opacity: 0.5,
      curveness: 0.2, //曲度
    },
    data: [
      {
        name: item.airName,
        fromName: item.fromName,
        toName: item.toName,
        coords: [geoCoordMap[item.fromName], geoCoordMap[item.toName]],
      },
    ],
  }));
};

const convertData = function (data: ApiData) {
  const res = [];
  for (let i = 0, len = data.length; i < len; i++) {
    const geoCoord = geoCoordMap[data[i].fromName];
    const geoCoord2 = geoCoordMap[data[i].toName];

    if (geoCoord) {
      res.push({
        name: data[i].fromName,
        value: geoCoord.concat(data[i].value),
      });
      res.push({
        name: data[i].toName,
        value: geoCoord2.concat(data[i].value),
      });
    }
  }
  return res;
};

const FleetModel = () => {
  const echart = useRef(null);

  const initial = () => {
    const myChart = echarts.init(echart.current);
    myChart.clear();
    //@ts-ignore
    echarts.registerMap('china', { geoJSON: geoJson });
    myChart.setOption({
      title: {
        text: '模拟航线',
        subtext: '数据纯属虚构',
        left: 'center',
        top: '20px',
        textStyle: {
          color: '#fff',
          fontSize: 24,
        },
      },
      geo: {
        map: 'china',
        layoutSize: '128%',
        // layoutCenter:["39%","50%"],
        zoom: 1,
        emphasis: {
          label: {
            show: false,
            color: '#fff',
          },
          itemStyle: {
            areaColor: '#4499d0',
          },
        },
        roam: true, //平移缩放
        itemStyle: {
          areaColor: '#0045A0',
          borderColor: '#00DFFF',
          borderWidth: 2,
        },
      },
      series: [
        {
          name: '散点',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 1,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
          },
          itemStyle: {
            color: '#fff',
          },
          //coordinateSystem:"geo"只会取数组的前两位当做点坐标数据
          data: convertData(apiData),
          //其中第一个参数 value 为 data 中的数据值。第二个参数params 是其它的数据项参数
          symbolSize: function (value: number[]) {
            return value[2] / 10;
          },
        },
        {
          name: '涟漪',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke',
          },
          label: {
            show: false,
            position: 'left',
            formatter: '{b}',
          },
          itemStyle: {
            color: 'rgba(102,204,255,0.9)',
            shadowBlur: 10,
            shadowColor: '#0ff7ee',
          },
          emphasis: {
            itemStyle: {
              areaColor: '#2B91B7',
            },
          },
          showEffectOn: 'render', //绘制完成后显示特效
          data: convertData(apiData),
          symbolSize: function (value: number[]) {
            return value[2] / 10;
          },
        },
        ...buildLines(apiData, geoCoordMap),
      ],
    });
  };

  useResize(echart);

  useEffect(() => {
    initial();
  }, []);

  return <div ref={echart} className="myChart"></div>;
};

export default FleetModel;
