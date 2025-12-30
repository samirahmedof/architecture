import {Row, Col} from '@shared/ui/grid/grid.component.tsx';
import s from './header.module.scss';
import {Link} from '@tanstack/react-router';
import {PATHS} from '@app/router/paths.router.ts';
import logo from '@assets/images/sima-negative.svg';
import avatar from '@assets/images/juan.webp';
import {LogOutIcon, MenuIcon} from 'lucide-react';
import {useUiStore} from '@app/store/ui.store.ts';
import {Select} from '@shared/ui/select/select.component.tsx';

export const Header = () => {
    const selectData = [
        {
            label: 'az',
            value: 'az',
        }, {
            label: 'ru',
            value: 'ru',
        },
        {
            label: 'en',
            value: 'en',
        }
    ];
    const toggleSidebar = useUiStore((state) => state.toggleSidebar);

    const logout = () => {
        console.log('rest');
    };

    return (
        <header className={s.header}>
            <div className={s.navbar}>
                <Row align='center'>
                    <Col sm={8}>
                        <div className={s.logo}>
                            <Link to={PATHS.HOME}>
                                <img src={logo} alt='logo'/>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <ul className={s.items}>
                            <li className={s.avatar}>
                                <img src={avatar} alt='avatar'/>
                            </li>
                            <li className={s.logout} onClick={logout}>
                                <LogOutIcon/>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
            <div className={s.sub}>
                <div className={s.toggle} onClick={toggleSidebar}>
                    <MenuIcon/>
                </div>
                <div>
                    <Select options={selectData} small value='az'/>
                </div>
            </div>
            <Row>
                <Col sm={4}>

                </Col>
            </Row>

            {/*header subcomponent */}
        </header>
    );
};
