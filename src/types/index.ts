//用户信息
export interface UserInfo {
  flag?: boolean;
  password: string;
  userName: string;
}

//主题
export type ThemeType = 'default' | 'blue' | 'black';

//echarts
export interface EchartsProps {
  theme: ThemeType;
  model?: {
    xAxis: string[];
    series: number[];
  };
}
