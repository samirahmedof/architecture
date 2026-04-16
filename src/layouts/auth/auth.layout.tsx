import { Outlet } from '@tanstack/react-router';
import styles from './auth.module.scss';

export const AuthLayout = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
};
