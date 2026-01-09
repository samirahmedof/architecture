import type { SidebarProps } from '@app/layouts/public/ui/sidebar/sidebar.types.ts';
import SidebarItem from '@app/layouts/public/ui/sidebar-item/sidebar-item.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import clsx from 'clsx';
import { House, NotepadText, Table } from 'lucide-react';
import s from './sidebar.module.scss';

const Sidebar = ({ isOpen }: SidebarProps) => {
  const items = [
    {
      id: 1,
      name: 'Home',
      link: PATHS.HOME,
      icon: House,
      submenu: [
        {
          id: 1,
          link: PATHS.HOME,
          name: 'test',
        },
        {
          id: 2,
          link: PATHS.HOME,
          name: 'test2',
        },
      ],
    },
    {
      id: 2,
      name: 'Table',
      link: PATHS.POST,
      icon: Table,
    },
    {
      id: 3,
      name: 'Form',
      link: PATHS.HOME,
      icon: NotepadText,
    },
  ];
  return (
    <aside className={clsx(s.sidebar, isOpen && s.open)}>
      <ul>
        {items.map((i: any) => (
          <SidebarItem key={i.id} name={i.name} link={i.link} icon={i.icon} submenu={i.submenu} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
