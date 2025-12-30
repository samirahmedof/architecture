import {useUiStore} from '@app/store/ui.store.ts';
import {useOnlineStatus} from '@shared/hooks/use-online-status.ts';
import {Outlet} from '@tanstack/react-router';
import {toast} from 'sonner';
import {Footer} from '@app/layouts/public/ui/footer/footer.tsx';
import {Header} from '@app/layouts/public/ui/header/header.tsx';
import Sidebar from '@app/layouts/public/ui/sidebar/sidebar.tsx';
import s from './public.module.scss';
import clsx from 'clsx';

// TODO: gonna change netvvork error design and move inline css to .module.scss file

const PublicLayout = () => {
    const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
    const isOnline = useOnlineStatus();
    const clicked = () => {
        console.log('clicked');
        toast.error('Clicked online');
    };
    return (
        <div>
            <Header/>
            {!isOnline && (
                <div>
                    İnternet bağlantısı kəsilib. Məlumatlarınız yadda saxlanılmaya bilər.
                </div>
            )}

            {/*<aside*/}
            {/*    style={{*/}
            {/*        width: isSidebarOpen ? '250px' : '0',*/}
            {/*        overflow: 'hidden',*/}
            {/*        background: '#f8f9fa',*/}
            {/*        transition: 'width 0.3s',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <div style={{padding: 20}}>*/}
            {/*        <nav style={{display: 'flex', flexDirection: 'column', gap: 10}}>*/}
            {/*            <Link to={PATHS.HOME} activeProps={{style: {fontWeight: 'bold'}}}>*/}
            {/*                Ana Səhifə*/}
            {/*            </Link>*/}
            {/*            <Link to={PATHS.ABOUT} activeProps={{style: {fontWeight: 'bold'}}}>*/}
            {/*                Haqqımızda*/}
            {/*            </Link>*/}
            {/*        </nav>*/}
            {/*    </div>*/}
            {/*</aside>*/}
            <Sidebar isOpen={isSidebarOpen}/>

            <main className={clsx(s.public, isSidebarOpen && s.open)}>
                <Outlet/>
            </main>


            <Footer isOpen={isSidebarOpen}/>
        </div>
    );
};

export default PublicLayout;
