import { ENV } from '@core/config/env.config';
import * as Sentry from '@sentry/react';
import { logger } from '@shared/utils/logger.ts';

/**
 * Initialize Sentry for error tracking and performance monitoring
 * Should be called BEFORE React app initialization (in main.tsx)
 */
export const initSentry = () => {
  // Only initialize in production or if DSN is explicitly provided
  const sentryDsn = ENV.SENTRY_DSN;

  if (!sentryDsn) {
    logger.warn('[Sentry] DSN not configured. Error tracking disabled.');
    return;
  }

  Sentry.init({
    dsn: sentryDsn,
    environment: ENV.NODE_ENV,

    // Performance Monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Performance Monitoring Configuration
    tracesSampleRate: ENV.IS_PROD ? 0.1 : 1.0, // 10% in prod, 100% in dev
    tracePropagationTargets: ['localhost', ENV.BASE_URL],

    // Session Replay Configuration
    replaysSessionSampleRate: ENV.IS_PROD ? 0.1 : 1.0, // 10% in prod
    replaysOnErrorSampleRate: 1.0, // Always record replays on errors

    // Release tracking (will be set by Vite plugin during build)
    release: import.meta.env.VITE_SENTRY_RELEASE || undefined, // Keep direct access for build-time injection

    // Filter out known non-critical errors
    beforeSend(event, hint) {
      // Don't send errors in development unless explicitly enabled
      if (ENV.IS_DEV && !ENV.SENTRY_ENABLE_DEV) {
        return null;
      }

      // Filter out network errors that are expected (e.g., CORS, network failures)
      const error = hint.originalException;
      if (error && typeof error === 'object' && 'message' in error) {
        const message = String(error.message).toLowerCase();
        if (
          message.includes('network error') ||
          message.includes('failed to fetch') ||
          message.includes('networkerror')
        ) {
          // Only send if it's a 5xx error (server issue)
          const status = (error as { response?: { status?: number } })?.response?.status;
          if (status && status < 500) {
            return null;
          }
        }
      }

      return event;
    },

    // Ignore specific errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'atomicFindClose',
      'fb_xd_fragment',
      'bmi_SafeAddOnload',
      'EBCallBackMessageReceived',
      // Network errors that are user-related
      'NetworkError',
      'Network request failed',
      // Chrome extensions
      'chrome-extension://',
      'moz-extension://',
    ],
  });
};

/**
 * Set user context for Sentry (call when user logs in)
 */
export const setSentryUser = (user: {
  id?: string | number;
  email?: string;
  username?: string;
  [key: string]: unknown;
}) => {
  Sentry.setUser(user);
};

/**
 * Clear user context (call when user logs out)
 */
export const clearSentryUser = () => {
  Sentry.setUser(null);
};

/**
 * Add breadcrumb for debugging
 */
export const addSentryBreadcrumb = (
  message: string,
  category?: string,
  level?: Sentry.SeverityLevel,
  data?: Record<string, unknown>,
) => {
  Sentry.addBreadcrumb({
    message,
    category: category || 'custom',
    level: level || 'info',
    data,
  });
};

/**
 * Capture exception manually
 */
export const captureException = (error: Error, context?: Record<string, unknown>) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

/**
 * Capture message manually
 */
export const captureMessage = (message: string, level?: Sentry.SeverityLevel) => {
  Sentry.captureMessage(message, level);
};
