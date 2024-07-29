import { UserOutlined, NotificationOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';

const Message = () => {
  return (
    <Wrapper>
      <Row className="icon-area" style={{ marginBottom: 10 }}>
        <Col span="8" className="icon-box">
          <Card hoverable styles={{ body: { padding: 0 } }}>
            <div className="icon-content">
              <UserOutlined className="grid-con-icon grid-con-1" />
              <div className="icon-info">
                <div className="grid-num number1">1234</div>
                <div className="describe">用户访问量</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8" className="icon-box">
          <Card hoverable styles={{ body: { padding: 0 } }}>
            <div className="icon-content">
              <NotificationOutlined className="grid-con-icon grid-con-2" />
              <div className="icon-info">
                <div className="grid-num number1">234</div>
                <div className="describe">系统消息</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8" className="icon-box">
          <Card hoverable styles={{ body: { padding: 0 } }}>
            <div className="icon-content">
              <FileDoneOutlined className="grid-con-icon grid-con-3" />
              <div className="icon-info">
                <div className="grid-num number3">20</div>
                <div className="describe">订单</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Message;

export const Wrapper = styled.div`
  .icon-area {
    .icon-box {
      padding-right: 20px;
      .icon-content {
        display: flex;
      }
      .icon-info {
        flex: 1;
        text-align: center;
        min-width: 100px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .grid-num {
          font-size: 30px;
          font-weight: bold;
        }
        .number1 {
          color: rgb(45, 140, 240);
        }
        .number2 {
          color: rgb(100, 213, 114);
        }
        .number3 {
          color: rgb(242, 94, 67);
        }
        .describe {
          font-size: 16px;
          line-height: 1.5;
        }
      }
    }
    .icon-box:nth-of-type(3) {
      padding-right: 0;
    }
    .grid-con-icon {
      font-size: 50px;
      width: 100px;
      height: 100px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .grid-con-1 {
      background: rgb(45, 140, 240);
    }
    .grid-con-2 {
      background: rgb(100, 213, 114);
    }
    .grid-con-3 {
      background: rgb(242, 94, 67);
    }
  }
`;
