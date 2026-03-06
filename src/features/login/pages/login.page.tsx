import { NAMESPACES } from '@app/lang/i18n.config.ts';
import { Button } from '@shared/ui';
import { cookieUtils } from '@shared/utils/cookie.ts';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const router = useRouter();

  const handleFakeLogin = () => {
    const fakeToken = 'eyJhGciOiJIUzI1Ni...';
    cookieUtils.setToken(fakeToken);
    router.navigate({ to: '/' }); // və ya search.redirect
  };
  const { t } = useTranslation(NAMESPACES.AUTH);

  return (
    <div className="p-10">
      <h1> {t('login.title')}</h1>
      <Button onClick={handleFakeLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        {t('login.button')}
      </Button>
    </div>
  );
};

export default LoginPage;
