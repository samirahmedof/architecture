import type { FooterProps } from '@app/layouts/public/model/public.types.ts';
import { APP } from '@core/config/app.config.ts';
import { Col, Container, Row } from '@packages';
import clsx from 'clsx';
import s from './footer.module.scss';

export const Footer = ({ isOpen }: FooterProps) => {
  const date = new Date().getFullYear();
  const projectName = APP.NAME;
  return (
    <footer className={clsx(s.footer, isOpen && s.open)}>
      <Container fluid>
        <Row>
          <Col sm={8}>
            copyright © {date} {projectName}, rights.
          </Col>
          <Col sm={4} className="text-right">
            AzInTelecom
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
