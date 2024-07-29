import { useTranslation } from 'react-i18next';

import { Card, Button } from 'antd';
import styled from 'styled-components';

const I18n = () => {
  const { t, i18n } = useTranslation();

  return (
    <Wrapper>
      <Card hoverable>
        <Button type="primary" size="large" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}>
          {t('btn')}
        </Button>
        <div className="frontArea">
          <strong>{t('title')}</strong>
        </div>
        <div className="frontArea">
          <em>{t('title1')}</em>
        </div>
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
        <p>{t('p3')}</p>
        <p>{t('p4')}</p>
      </Card>
    </Wrapper>
  );
};

export default I18n;

const Wrapper = styled.div`
  padding: 10px;
  .frontArea {
    margin: 15px 0;
  }
`;
