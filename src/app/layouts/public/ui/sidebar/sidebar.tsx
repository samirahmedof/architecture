import { DEFAULT_LANGUAGE } from '@app/lang/i18n.config.ts';
import type { SidebarMenuItem, SidebarProps } from '@app/layouts/public/public.types.ts';
import SidebarItem from '@app/layouts/public/ui/sidebar-item/sidebar-item.tsx';
import { useParams } from '@tanstack/react-router';
import clsx from 'clsx';
import { House, NotepadText, Table } from 'lucide-react';
import s from './sidebar.module.scss';

const Sidebar = ({ isOpen }: SidebarProps) => {
  const items: SidebarMenuItem[] = [
    {
      id: 1,
      name: 'Home',
      link: '/$locale/',
      icon: House,
      submenu: [
        {
          id: 1,
          link: '/$locale/',
          name: 'test',
        },
        {
          id: 2,
          link: '/$locale/',
          name: 'test2',
        },
      ],
    },
    {
      id: 2,
      name: 'Table',
      link: '/$locale/post',
      icon: Table,
      exact: false,
    },
    {
      id: 3,
      name: 'Form',
      link: '/$locale/',
      icon: NotepadText,
    },
  ];
  const { locale } = useParams({ strict: false });

  return (
    <aside className={clsx(s.sidebar, isOpen && s.open)}>
      <ul>
        {items.map((i: SidebarMenuItem) => (
          <SidebarItem key={i.id} {...i} locale={locale ?? DEFAULT_LANGUAGE} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
