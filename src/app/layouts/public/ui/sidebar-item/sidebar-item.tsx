import type { SidebarItemProps, SubmenuItem } from '@app/layouts/public/model/public.types.ts';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import s from './sidebar-item.module.scss';

const SidebarItem = ({ name, link, icon: Icon, submenu }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={s.item}>
      {!submenu ? (
        <Link to={link} className={s.link} activeProps={{ className: s.active }}>
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
                      className={s.sublink}
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

export default SidebarItem;
