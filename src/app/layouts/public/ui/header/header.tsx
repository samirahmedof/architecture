import { DEFAULT_LANGUAGE, type Language } from '@app/lang/i18n.config.ts';
import avatar from '@assets/images/juan.webp';
import logo from '@assets/images/sima-negative.svg';
import { useUiStore } from '@shared/store/ui.store.ts';
import { Col, Row } from '@shared/ui/grid/grid.tsx';
import { Select } from '@shared/ui/select/select.tsx';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { LogOut, Menu } from 'lucide-react';
import s from './header.module.scss';

const LANGUAGES = [
  { label: 'Azerbaycan', value: 'az' },
  { label: 'English', value: 'en' },
  { label: 'Russkiy', value: 'ru' },
];

export const Header = () => {
  const { locale } = useParams({ strict: false });
  const navigate = useNavigate();

  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  const logout = () => {
    console.log('rest');
  };

  const changeLang = (newLang: Language) => {
    void navigate({
      to: '.',
      params: (prev) => ({ ...prev, locale: newLang }),
      replace: true,
    }).catch(console.error);
  };

  return (
    <header className={s.header}>
      <div className={s.navbar}>
        <Row align="center">
          <Col sm={8}>
            <div className={s.logo}>
              <Link to={'/$locale'} params={{ locale: locale || DEFAULT_LANGUAGE }}>
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
          <Select options={LANGUAGES} small value={locale} onValueChange={changeLang} />
        </div>
      </div>
    </header>
  );
};
