import { Footer } from '@app/layouts/public/ui/footer/footer.tsx';
import { Header } from '@app/layouts/public/ui/header/header.tsx';
import Sidebar from '@app/layouts/public/ui/sidebar/sidebar.tsx';
import { useUiStore } from '@app/store/ui.store.ts';
import { useOnlineStatus } from '@shared/hooks/use-online-status.ts';
import { Outlet } from '@tanstack/react-router';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import s from './public.module.scss';

//change network error logic
const PublicLayout = () => {
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const isOnline = useOnlineStatus();
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (!isOnline) toast.error('İnternet bağlantısı yoxdur', { id: 'network-status' });
      return;
    }

    if (!isOnline) {
      toast.error('İnternet bağlantısı kəsilib. Məlumatlarınız yadda saxlanılmaya bilər', {
        id: 'network-status',
        duration: Infinity,
      });
    } else {
      toast.dismiss('network-status');
      toast.success('İnternet bağlantısı bərpa olundu', { id: 'network-success' });
    }
  }, [isOnline]);
  return (
    <div>
      <Header />
      {!isOnline && (
        <div className={s.network}>
          İnternet bağlantısı kəsilib. Məlumatlarınız yadda saxlanılmaya bilər.
        </div>
      )}
      <Sidebar isOpen={isSidebarOpen} />
      <main className={clsx(s.layout, isSidebarOpen && s.open)}>
        <Outlet />
      </main>

      <Footer isOpen={isSidebarOpen} />
    </div>
  );
};

export default PublicLayout;
