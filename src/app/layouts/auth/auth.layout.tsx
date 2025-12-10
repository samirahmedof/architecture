import { Outlet } from '@tanstack/react-router';

const AuthLayout = () => {
	return (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: '#e9ecef',
			}}
		>
			<Outlet />
		</div>
	);
};
export default AuthLayout;
