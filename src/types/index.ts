//消息
export interface Message {
  name: string;
  image: string;
  text: string;
}

//用户信息
export interface UserInfo {
  flag?: boolean;
  passWord: string;
  userName: string;
}

//主题
export type ThemeType = 'theme-gray' | 'theme-blue' | 'theme-black';

//echarts
export interface EchartsProps {
  theme: ThemeType;
  model?: {
    xAxis: string[];
    series: number[];
  };
}
