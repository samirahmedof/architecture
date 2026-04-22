import { NAMESPACES } from '@shared/config/i18n.config.ts';
import { Button } from '@shared/ui';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { tokenStorage } from '../model/token-storage.ts';
import styles from './login.module.css';

const LoginPage = () => {
  const router = useRouter();

  const handleFakeLogin = () => {
    const fakeToken = 'eyJhGciOiJIUzI1Ni...';
    tokenStorage.setToken(fakeToken);
    router.navigate({ to: '/' });
  };
  const { t } = useTranslation(NAMESPACES.AUTH);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('login.title')}</h1>
      <Button variant='primary' onClick={handleFakeLogin}>
        {t('login.button')}
      </Button>
    </div>
  );
};

export default LoginPage;
