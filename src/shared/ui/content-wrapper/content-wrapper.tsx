import type { ReactNode } from 'react';
import s from './content-wrapper.module.scss';

export type ContentWrapperProps = {
  children: ReactNode;
};

export const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return <div className={s.card}>{children}</div>;
};
