import { Card, Progress } from 'antd';
import styled from 'styled-components';

const format = (percent: number | undefined) => {
  if (percent! >= 90) {
    return '精通';
  } else if (percent! >= 80) {
    return '熟练';
  } else if (percent! >= 70) {
    return '一般';
  } else {
    return '了解';
  }
};

const ProgressCard = () => {
  return (
    <Wrapper>
      <Card title="语言详情" hoverable className="user">
        Vue
        <Progress percent={98} strokeColor="#42b983" format={format} />
        Uni-app
        <Progress percent={89} strokeColor="#f1e05a" format={format} />
        React
        <Progress percent={88} format={format} />
        Nuxt
        <Progress percent={87} strokeColor="#f56c6c" format={format} />
      </Card>
    </Wrapper>
  );
};

export default ProgressCard;

const Wrapper = styled.div`
  .ant-card {
    line-height: 1 !important;
  }
`;
