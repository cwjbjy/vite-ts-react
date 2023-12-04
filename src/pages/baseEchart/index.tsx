import { Row, Col, Card } from 'antd';
import styled from 'styled-components';

import Bar from './components/bar';
import Cylinder from './components/cylinder';
import Line from './components/line';
import Pie from './components/pie';
import Scale from './components/scale';
import Scatter from './components/scatter';

import useThemeStore from '@/store/theme';

const Chart = () => {
  const { theme } = useThemeStore();
  return (
    <Wrapper>
      <Row className="chart">
        <Col span={12} className="echarts-box">
          <Card hoverable>
            <Bar theme={theme} />
          </Card>
        </Col>
        <Col span={12} className="echarts-box">
          <Card hoverable>
            <Pie theme={theme} />
          </Card>
        </Col>
      </Row>
      <Row className="chart">
        <Col span={12} className="echarts-box">
          <Card hoverable>
            <Scatter theme={theme} />
          </Card>
        </Col>
        <Col span={12} className="echarts-box">
          <Card hoverable>
            <Scale theme={theme} />
          </Card>
        </Col>
      </Row>
      <Row className="chart">
        <Col span={12} className="echarts-box">
          <Card hoverable>
            <Line theme={theme} />
          </Card>
        </Col>
        <Col span={12} className="echarts-box">
          <Card hoverable>
            <Cylinder theme={theme} />
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Chart;

const Wrapper = styled.div`
  .chart {
    .echarts-box {
      padding: 10px;
    }
  }
`;
