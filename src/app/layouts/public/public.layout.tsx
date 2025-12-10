import { PATHS } from '@app/router/paths.router.ts';
import { useUiStore } from '@app/store/ui.store.ts';
import { useOnlineStatus } from '@shared/hooks/use-online-status.ts';
import { Button } from '@shared/ui';
import { Link, Outlet } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { toast } from 'sonner';

// TODO: change netvvork error design

const PublicLayout = () => {
	const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
	const toggleSidebar = useUiStore((state) => state.toggleSidebar);
	const isOnline = useOnlineStatus();
	const clicked = () => {
		console.log('clicked');
		toast.error('Clicked online');
	};
	return (
		<div style={{ display: 'flex', minHeight: '100vh' }}>
			{!isOnline && (
				<div className="bg-red-500 text-white text-center p-1 text-sm fixed top-0 w-full z-50">
					İnternet bağlantısı kəsilib. Məlumatlarınız yadda saxlanılmaya bilər.
				</div>
			)}
			<aside
				style={{
					width: isSidebarOpen ? '250px' : '0',
					overflow: 'hidden',
					background: '#f8f9fa',
					transition: 'width 0.3s',
				}}
			>
				<div style={{ padding: 20 }}>
					<nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
						<Link to={PATHS.HOME} activeProps={{ style: { fontWeight: 'bold' } }}>
							Ana Səhifə
						</Link>
						<Link to={PATHS.ABOUT} activeProps={{ style: { fontWeight: 'bold' } }}>
							Haqqımızda
						</Link>
					</nav>
				</div>
			</aside>

			<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
				<header
					style={{
						padding: 15,
						borderBottom: '1px solid #eee',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Button variant="outline" onClick={toggleSidebar} icon={<Menu size={18} />}>
						Menu
					</Button>
					<span style={{ marginLeft: 20 }}>Admin Panel</span>
				</header>

				<main style={{ padding: 20, flex: 1 }}>
					<Outlet />
					<Button onClick={() => clicked()}>error</Button>
				</main>
			</div>
		</div>
	);
};

export default PublicLayout;
