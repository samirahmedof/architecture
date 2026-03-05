import { NAMESPACES } from '@app/lang/i18n.config.ts';
import type { FooterProps } from '@app/layouts/public/public.types.ts';
import { APP } from '@shared/config';
import { Col, Container, Row } from '@shared/ui';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import s from './footer.module.scss';

export const Footer = ({ isOpen }: FooterProps) => {
  const { t } = useTranslation(NAMESPACES.COMMON);
  const date = new Date().getFullYear();
  const projectName = APP.NAME;
  return (
    <footer className={clsx(s.footer, isOpen && s.open)}>
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
