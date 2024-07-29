import { useState } from 'react';

import { Card, Button, Modal } from 'antd';
import styled from 'styled-components';

const PdfPreview = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Wrapper>
      <Card hoverable>
        <strong>点击按钮，进行pdf预览，具有放大、缩小、下载、打印功能</strong>
        <div className="frontArea">
          <Button type="primary" size="large" onClick={() => setIsModalVisible(true)}>
            点我弹框
          </Button>
        </div>
        <Modal
          title="pdf预览"
          style={{ top: 20 }}
          width="90%"
          open={isModalVisible}
          footer={null}
          getContainer={false}
          onCancel={() => setIsModalVisible(false)}
        >
          <iframe src="/static/cwj.pdf" frameBorder="0" title="pdf"></iframe>
        </Modal>
      </Card>
    </Wrapper>
  );
};

export default PdfPreview;

const Wrapper = styled.div`
  padding: 10px;
  .frontArea {
    margin-top: 15px;
  }
  iframe {
    width: 100%;
    height: calc(98vh - 170px);
  }
`;
