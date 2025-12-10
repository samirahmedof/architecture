export interface UiState {
	isSidebarOpen: boolean;
	theme: 'light' | 'dark';
	toggleSidebar: () => void;
	setTheme: (theme: 'light' | 'dark') => void;
}

export interface AuthState {
	accessToken: string | null;
	setAccessToken: (token: string) => void;
	clearAuth: () => void;
}
