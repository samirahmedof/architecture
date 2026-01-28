import type { ReactNode } from 'react';
import s from './content-wrapper.module.scss';

export const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <div className={s.card}>{children}</div>;
};
