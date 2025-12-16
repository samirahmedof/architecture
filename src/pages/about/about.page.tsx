import { aboutQueries } from '@pages/about/data/about.queries.ts';
import { AboutItem } from '@pages/about/ui/about-item';
import { Button, Modal } from '@shared/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './about.module.scss';

const AboutPage = () => {
  const { data } = useSuspenseQuery(aboutQueries.detail(2));
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h2>{data.header}</h2>
      <AboutItem />
      <p className={styles.description}>{data.description}</p>

      <div style={{ marginTop: 20 }}>
        <Button onClick={() => setIsModalOpen(true)}>Detallı Baxış</Button>
      </div>

      <Modal title="Şirkət Detalları" isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <p>
          Burada şirkət haqqında əlavə məlumatlar olacaq. Radix UI sayəsində ESC basanda bağlanacaq.
        </p>
        <div style={{ marginTop: 15, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="danger" onClick={() => setIsModalOpen(false)}>
            Bağla
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default AboutPage;
