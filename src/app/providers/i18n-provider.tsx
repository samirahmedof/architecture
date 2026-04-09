import type { ReactNode } from 'react';
import '@shared/lib/i18n/i18n.ts';

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => children;
