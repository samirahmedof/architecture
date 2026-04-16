import type { LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

export type SidebarProps = ComponentProps<'aside'> & {
  isOpen: boolean;
};

export type SubmenuItem = {
  id: number;
  name: string;
  link: string;
};

export type SidebarMenuItem = {
  id: number;
  name: string;
  link: string;
  icon: LucideIcon;
  exact?: boolean;
  submenu?: SubmenuItem[];
};
