import { NAMESPACES } from '@core/lang/i18n.config.ts';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation(NAMESPACES.COMMON);
  return (
    <div>
      <h2>{t('app.name')}</h2>
      <p>{t('app.description')}</p>
    </div>
  );
};

export default HomePage;
