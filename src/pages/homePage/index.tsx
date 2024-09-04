import { useState } from 'react';

import { useRequest } from 'ahooks';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';

import { ls } from '@/utils/storage';

import { getUser } from '@/apis/user';

import Bar from './components/bar';
import BarLine from './components/barLine';
import Message from './components/message';
import ProgressCard from './components/progressCard';
import Schedule from './components/schedule';
import UserCard from './components/userCard';

import { USER_INFO } from '@/settings/localStorage';
import useFileStore from '@/store/file';
import useThemeStore from '@/store/theme';

const barModel = {
  xAxis: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  series: [120, 200, 150, 80, 70, 110],
};

const HomePage = () => {
  const { fileName } = useFileStore();

  const { theme } = useThemeStore();

  const [createTime, setCreateTime] = useState('');

  const userName = ls.get(USER_INFO)?.userName;

  useRequest(getUser, {
    ready: !!userName,
    defaultParams: [{ userName }],
    onSuccess: (res) => {
      setCreateTime(res.data);
    },
  });

  return (
    <Wrapper>
      <div className="row1">
        <div className="info">
          <UserCard fileName={fileName} userName={userName} registerTime={createTime} />
          <ProgressCard />
        </div>
        <div style={{ marginLeft: 20, flex: 1 }}>
          <Message />
          <div className="Schedule">
            <Schedule />
          </div>
        </div>
      </div>
      <Row style={{ marginBottom: 10 }}>
        <Col span={12} lg={12} xl={12} className="echarts-box">
          <Card hoverable>
            <Bar theme={theme} model={barModel} />
          </Card>
        </Col>
        <Col span={12} lg={12} xl={12} className="echarts-box">
          <Card hoverable>
            <BarLine theme={theme} />
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  padding: 10px;
  padding-left: 20px;

  .info {
    display: flex;
    flex-direction: column;
  }

  .Schedule {
    min-width: 560px;
  }

  .echarts-box:nth-of-type(1) {
    padding-right: 10px;
  }

  .echarts-box:nth-of-type(2) {
    padding-left: 10px;
  }

  .row1 {
    display: flex;
    margin-bottom: 10px;
  }
`;
