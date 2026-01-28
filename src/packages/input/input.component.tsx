import clsx from 'clsx';
import { forwardRef } from 'react';
import type { InputProps } from './form.types.ts';
import s from './input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isError, ...props }, ref) => {
    return <input ref={ref} className={clsx(s.input, className, isError && s.error)} {...props} />;
  },
);

Input.displayName = 'Input';
