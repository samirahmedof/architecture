import { clearSentryUser, setSentryUser } from './sentry.config.ts';

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

// This module intentionally contains only framework-agnostic helpers.
// React components or layouts should call `syncSentryUser` themselves
// after reading auth state from their own stores/contexts.
