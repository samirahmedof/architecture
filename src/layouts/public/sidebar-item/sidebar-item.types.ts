import type { Language } from '@shared/config/i18n.config.ts';
import type { SidebarMenuItem } from '../sidebar/sidebar.types.ts';

export type SidebarItemProps = Omit<SidebarMenuItem, 'id'> & {
  locale: Language;
};
