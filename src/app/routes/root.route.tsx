import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router';
import {useUiStore} from '@shared/store/ui.store';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';
import {Suspense} from 'react';
import type {QueryClient} from '@tanstack/react-query'
import {Button} from '@shared/ui';
import {Menu} from 'lucide-react';

interface MyRouterContext {
    queryClient: QueryClient;
}

// createRootRoute əvəzinə createRootRouteWithContext istifadə edirik
export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootComponent,
});

function RootComponent() {
    // Zustand hook-u (Selector pattern istifadə etmək performans üçün yaxşıdır)
    const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
    const toggleSidebar = useUiStore((state) => state.toggleSidebar);

    return (
        <>
            <div style={{display: 'flex', minHeight: '100vh'}}>

                {/* 1. Sidebar (Sol tərəf) */}
                <aside
                    style={{
                        width: isSidebarOpen ? '250px' : '0',
                        overflow: 'hidden',
                        transition: 'width 0.3s',
                        borderRight: '1px solid #eee',
                        background: '#f8f9fa'
                    }}
                >
                    <div style={{padding: 20}}>
                        <h3>Menu</h3>
                        <nav style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20}}>
                            <Link to='/'>Ana Səhifə</Link>
                            <Link to='/about'>Haqqımızda</Link>
                            <Link to='/login'>Giriş (Login)</Link>
                        </nav>
                    </div>
                </aside>

                {/* 2. Main Content (Sağ tərəf) */}
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>

                    {/* Header */}
                    <header style={{
                        padding: '10px 20px',
                        borderBottom: '1px solid #eee',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Button variant='outline' onClick={toggleSidebar} icon={<Menu size={18}/>}>
                            {isSidebarOpen ? 'Bağla' : 'Menyu'}
                        </Button>
                        <span style={{marginLeft: 20, fontWeight: 'bold'}}>Sima Admin</span>
                    </header>

                    {/* Page Content */}
                    <main style={{padding: 20, flex: 1}}>
                        <Suspense fallback={<div>Yüklənir...</div>}>
                            <Outlet/>
                        </Suspense>
                    </main>
                </div>
            </div>
            <TanStackRouterDevtools/>
        </>
    );
}