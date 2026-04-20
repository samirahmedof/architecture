import { APP } from '@shared/config/app.config.ts';
import { NAMESPACES } from '@shared/config/i18n.config.ts';
import { Col, Container, Row } from '@shared/ui';
import { useTranslation } from 'react-i18next';
import s from './footer.module.css';

export const Footer = () => {
  const { t } = useTranslation(NAMESPACES.COMMON);
  const date = new Date().getFullYear();
  const projectName = APP.NAME;
  return (
    <footer className={s.footer}>
      <Container fluid>
        <Row>
          <Col sm={8}>{t('footer.copy', { year: date, project: projectName })}</Col>
          <Col sm={4} className="text-right">
            {t('footer.company')}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
