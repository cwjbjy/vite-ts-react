import styled from 'styled-components';

import FleetModel from './components/china';

const FleetLine = () => {
  return (
    <Wrapper>
      <FleetModel />
    </Wrapper>
  );
};

export default FleetLine;

const Wrapper = styled.div`
  background-color: var(--fleet-background);
  .myChart {
    width: 100%;
    height: calc(100vh - 70px);
  }
`;
