import { NAMESPACES } from '@app/lang/i18n.config.ts';
import { useOnlineStatus } from '@shared/hooks/use-online-status.ts';
import { useUiStore } from '@shared/store/ui.store.ts';
import { Outlet } from '@tanstack/react-router';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Footer } from './footer/footer.tsx';
import { Header } from './header/header.tsx';
import s from './public.module.scss';
import Sidebar from './sidebar/sidebar.tsx';

//change network error logic
const PublicLayout = () => {
  const { t } = useTranslation(NAMESPACES.COMMON);
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const isOnline = useOnlineStatus();
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (!isOnline) toast.error(t('network.initialOffline'), { id: 'network-status' });
      return;
    }

    if (!isOnline) {
      toast.error(t('network.offline'), {
        id: 'network-status',
        duration: Infinity,
      });
    } else {
      toast.dismiss('network-status');
      toast.success(t('network.online'), { id: 'network-success' });
    }
  }, [isOnline, t]);
  return (
    <div>
      <Header />
      {!isOnline && <div className={s.network}>{t('network.banner')}</div>}
      <Sidebar isOpen={isSidebarOpen} />
      <main className={clsx(s.layout, isSidebarOpen && s.open)}>
        <Outlet />
      </main>

      <Footer isOpen={isSidebarOpen} />
    </div>
  );
};

export default PublicLayout;
