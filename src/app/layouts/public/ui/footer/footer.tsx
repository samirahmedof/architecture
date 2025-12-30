import {Row, Col, Container} from '@shared/ui/grid/grid.component.tsx';
import {APP} from '@core/config/app.config.ts';
import s from './footer.module.scss';
import clsx from 'clsx';
import type {FooterProps} from '@app/layouts/public/ui/footer/footer.types.ts';

export const Footer = ({isOpen}: FooterProps) => {
    const date = new Date().getFullYear();
    const projectName = APP.NAME;
    return (
        <footer className={clsx(s.footer, isOpen && s.open)}>
            <Container fluid>
                <Row>
                    <Col sm={8}>
                        copyright © {date} {projectName}, rights.
                    </Col>
                    <Col sm={4}>
                        AzInTelecom
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
