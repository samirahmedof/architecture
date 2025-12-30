import {PATHS} from '@app/router/paths.router.ts';
import {HomeIcon} from 'lucide-react';
import s from './sidebar.module.scss';
import SidebarItem from '@app/layouts/public/ui/sidebar-item/sidebar-item.tsx';
import type {SidebarProps} from '@app/layouts/public/ui/sidebar/sidebar.types.ts';
import clsx from 'clsx';

const Sidebar = ({isOpen}: SidebarProps) => {
    const items = [
        {
            id: 1,
            name: 'home_title',
            link: PATHS.HOME,
            icon: <HomeIcon/>,
            submenu: [
                {
                    id: 1,
                    link: PATHS.HOME,
                    name: 'test',
                },
                {
                    id: 2,
                    link: PATHS.HOME,
                    name: 'test2'
                },
            ]
        },
        {
            id: 2,
            name: 'table_title',
            link: PATHS.HOME,
            icon: <HomeIcon/>,
        },
        {
            id: 3,
            name: 'form_title',
            link: PATHS.HOME,
            icon: <HomeIcon/>,
        }
    ];

    return (
        <aside className={clsx(s.sidebar, isOpen && s.open)}>
            <ul>
                {
                    items.map((i: any) => (
                        <SidebarItem
                            key={i.id}
                            name={i.name}
                            link={i.link}
                            icon={i.icon}
                            submenu={i.submenu}
                        />
                    ))
                }
            </ul>
        </aside>
    );
};

export default Sidebar;