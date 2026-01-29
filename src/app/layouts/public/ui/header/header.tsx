import { PATHS } from '@app/router/paths.router.ts';
import { useUiStore } from '@app/store/ui.store.ts';
import avatar from '@assets/images/juan.webp';
import logo from '@assets/images/sima-negative.svg';
import { Col, Row, Select } from '@packages';
import { Link } from '@tanstack/react-router';
import { LogOut, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import s from './header.module.scss';

const LANGUAGES = [
  { label: 'Azerbaycan', value: 'az' },
  { label: 'English', value: 'en' },
  { label: 'Russkiy', value: 'ru' },
];

export const Header = () => {
  const { i18n } = useTranslation();

  // TODO: make this global method
  const currentLang = localStorage.getItem('i18n_lang') || 'en';

  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  const logout = () => {
    console.log('rest');
  };

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
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
          <Select options={LANGUAGES} small defaultValue={currentLang} onValueChange={changeLang} />
        </div>
      </div>
    </header>
  );
};
