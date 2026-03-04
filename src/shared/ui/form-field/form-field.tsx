import { useFormContext } from 'react-hook-form';
import s from './form-field.module.scss';
import type { FormFieldProps } from './form-field.types.ts';

export const FormField = ({ name, label, children }: FormFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className={s.wrapper}>
      {label && (
        <label htmlFor={name} className={s.label}>
          {label}
        </label>
      )}
      {children}
      <span className={s.error}>{error}</span>
    </div>
  );
};
