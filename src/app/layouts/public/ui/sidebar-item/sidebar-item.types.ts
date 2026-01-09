import type { ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';

export type SidebarItemProps = ComponentProps<'li'> & {
  name: string;
  link: string;
  icon: LucideIcon;
  submenu?: SidebarItemProps[];
};
