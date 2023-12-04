import { Spin } from 'antd';
import styled from 'styled-components';

const FullScreenLoading = () => {
  return (
    <FullScreen>
      <Spin delay={1000} size="large" />
    </FullScreen>
  );
};

export default FullScreenLoading;

const FullScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
