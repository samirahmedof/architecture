import clsx from 'clsx';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import s from './table-actions.module.scss';

export type ActionButtonProps = {
  onClick?: () => void;
  icon: ReactNode;
  variant: keyof typeof s;
  title?: string;
};

export type TableActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  children?: ReactNode;
};

const ActionBtn = ({ onClick, icon, variant, title }: ActionButtonProps) => {
  if (!onClick) return null;

  return (
    <button
      type="button"
      className={clsx(s.button, s[variant])}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={title}
    >
      {icon}
    </button>
  );
};

export const TableActions = ({ onEdit, onDelete, onView, children }: TableActionsProps) => {
  return (
    <div className={s.wrapper}>
      <ActionBtn onClick={onView} icon={<Eye size={18} />} variant="view" title="Ətraflı bax" />
      <ActionBtn onClick={onEdit} icon={<Pencil size={18} />} variant="edit" title="Düzəliş et" />
      {children}
      <ActionBtn onClick={onDelete} icon={<Trash2 size={18} />} variant="del" title="Sil" />
    </div>
  );
};
