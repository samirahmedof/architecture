import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { SubmenuItem } from '../sidebar/sidebar.types.ts';
import s from './sidebar-item.module.scss';
import type { SidebarItemProps } from './sidebar-item.types.ts';

export const SidebarItem = ({
  name,
  link,
  icon: Icon,
  submenu,
  locale,
  exact = true,
}: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={s.item}>
      {!submenu ? (
        <Link
          to={link}
          params={{ locale }}
          className={s.link}
          activeOptions={{ exact }}
          activeProps={{ className: s.active }}
        >
          <div className={s.text}>
            <Icon className={s.icon} />
            <span>{name}</span>
          </div>
        </Link>
      ) : (
        <>
          <button
            className={clsx(s.link, isOpen && s.open)}
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <div className={s.text}>
              <Icon className={s.icon} />
              <span>{name}</span>
            </div>
            <span>{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
          </button>
          {isOpen && (
            <ul className={s.submenu}>
              {submenu.map((item: SubmenuItem) => {
                return (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      params={{ locale }}
                      className={s.sublink}
                      activeOptions={{ exact }}
                      activeProps={{ className: s.active }}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </li>
  );
};
