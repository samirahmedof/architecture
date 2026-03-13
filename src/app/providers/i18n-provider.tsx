import type { ReactNode } from 'react';
import '@app/core/i18n.ts';

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => children;
