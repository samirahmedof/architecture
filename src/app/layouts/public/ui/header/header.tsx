import { PATHS } from '@app/router/paths.router.ts';
import { useUiStore } from '@app/store/ui.store.ts';
import avatar from '@assets/images/juan.webp';
import logo from '@assets/images/sima-negative.svg';
import { Col, Row, Select } from '@packages';
import { Link } from '@tanstack/react-router';
import { LogOut, Menu } from 'lucide-react';
import s from './header.module.scss';

export const Header = () => {
  const selectData = [
    {
      label: 'az',
      value: 'az',
    },
    {
      label: 'ru',
      value: 'ru',
    },
    {
      label: 'en',
      value: 'en',
    },
  ];
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  const logout = () => {
    console.log('rest');
  };

  return (
    <header className={s.header}>
      <div className={s.navbar}>
        <Row align="center">
          <Col sm={8}>
            <div className={s.logo}>
              <Link to={PATHS.HOME}>
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </Col>
          <Col sm={4}>
            <ul className={s.items}>
              <li>
                <button className={s.avatar} type="button">
                  <img src={avatar} alt="avatar" />
                </button>
              </li>
              <li>
                <button className={s.logout} type="button" onClick={logout}>
                  <LogOut />
                </button>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <div className={s.sub}>
        <button className={s.toggle} onClick={toggleSidebar} type="button">
          <Menu />
        </button>
        <div>
          <Select options={selectData} small value="az" />
        </div>
      </div>
    </header>
  );
};
