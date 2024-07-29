import { memo } from 'react';

import { Row, Col } from 'antd';

import { getAssetsFile } from '@/utils/share';

export default memo(function Content() {
  return (
    <>
      <div>1. 通过Git提交代码到GitHub</div>
      <div>2. GitHub通过Webhooks通知Jenkins</div>
      <div>3. Jenkins fetch源码到工作空间</div>
      <div>4. 编译下载到工作空间的源码</div>
      <div>5. 对源码进行打包</div>
      <div>6. 将打包后的代码发送到云服务器指定目录</div>
      <div>7. 邮件通知</div>
      <div className="pic">
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <div className="gutter-row">
              1.
              <img src={getAssetsFile('login/1.png')} className="headPortrait" alt="加载失败" />
            </div>
          </Col>
          <Col span={12}>
            <div className="gutter-row">
              2.
              <img src={getAssetsFile('login/2.png')} className="headPortrait" alt="加载失败" />
            </div>
          </Col>
          <Col span={12}>
            <div className="gutter-row">
              3.
              <img src={getAssetsFile('login/3.png')} className="headPortrait" alt="加载失败" />
            </div>
          </Col>
          <Col span={12}>
            <div className="gutter-row">
              4.
              <img src={getAssetsFile('login/4.png')} className="headPortrait" alt="加载失败" />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
});
