import { NAMESPACES } from '@shared/config/i18n.config.ts';
import { Col, Row } from '@shared/ui';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation(NAMESPACES.COMMON);
  return (
    <div>
      <Row>
        <Col lg={6}>
          <h2>{t('app.name')}</h2>
        </Col>
        <Col lg={6}>
          <p>{t('app.description')}</p>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
