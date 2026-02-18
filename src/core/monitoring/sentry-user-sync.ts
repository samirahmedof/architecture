import { useAuthStore } from '@app/store/auth.store';
import { useEffect } from 'react';
import { clearSentryUser, setSentryUser } from './sentry.config';

/**
 * Sync Sentry user context with auth store
 * Call this when the user logs in or when auth state changes
 *
 * Example usage:
 * ```ts
 * const token = useAuthStore(state => state.accessToken);
 * useEffect(() => {
 *   if (token) {
 *     syncSentryUser(token);
 *   } else {
 *     clearSentryUser();
 *   }
 * }, [token]);
 * ```
 */
export const syncSentryUser = (
  token: string | null,
  userData?: {
    id?: string | number;
    email?: string;
    username?: string;
    [key: string]: unknown;
  },
) => {
  if (token && userData) {
    // If you have user data from your auth system, use it
    setSentryUser(userData);
  } else if (token) {
    // If you only have a token, you might want to decode it or fetch user data
    // For now, we'll just set a minimal context
    setSentryUser({
      authenticated: true,
    });
  } else {
    clearSentryUser();
  }
};

/**
 * Hook to automatically sync Sentry user context with auth store
 * Add this to your root layout or auth provider
 */
export const useSentryUserSync = () => {
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    // Sync when token changes
    // Note: You may want to decode the token or fetch user data to get actual user info
    // For now, this is a basic implementation
    if (token) {
      setSentryUser({
        authenticated: true,
        // Add more user data here if available from your auth system
        // Example: if you decode JWT tokens, you could extract user ID, email, etc.
      });
    } else {
      clearSentryUser();
    }
  }, [token]);
};
