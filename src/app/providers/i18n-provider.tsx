import type { ReactNode } from 'react';
import '@app/lang/i18n.config.ts';

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => children;
