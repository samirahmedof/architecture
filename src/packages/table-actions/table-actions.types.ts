import type { ReactNode } from 'react';

export type ActionButtonProps = {
  onClick?: () => void;
  icon: ReactNode;
  variant: 'edit' | 'delete' | 'view' | 'default';
  title?: string;
};

export type TableActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  children?: ReactNode;
};
