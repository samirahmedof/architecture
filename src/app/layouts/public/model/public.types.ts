import type { LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

export type SidebarProps = ComponentProps<'aside'> & {
  isOpen: boolean;
};

export type FooterProps = ComponentProps<'footer'> & {
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
  submenu?: SubmenuItem[];
};

export type SidebarItemProps = Omit<SidebarMenuItem, 'id'>;
