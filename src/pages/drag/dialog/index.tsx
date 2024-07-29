import { useState } from 'react';

import { Modal, Card, Button } from 'antd';
import styled from 'styled-components';

import Toast from './components/index';

const DragModel = () => {
  const [visible, onVisible] = useState(false);

  return (
    <Wrapper>
      <Card hoverable title={<strong>点击按钮，鼠标移动到弹框处，可实现拖拽功能。</strong>}>
        <Button type="primary" size="large" onClick={() => onVisible(true)}>
          点我弹框
        </Button>
        <Modal onCancel={() => onVisible(false)} onOk={() => onVisible(false)} title="拖拽弹框" open={visible}>
          <Toast></Toast>
        </Modal>
      </Card>
    </Wrapper>
  );
};

export default DragModel;

const Wrapper = styled.div`
  padding: 10px;
  .ant-modal-content {
    position: absolute !important;
    width: 480px;
    cursor: grab;
  }
`;
