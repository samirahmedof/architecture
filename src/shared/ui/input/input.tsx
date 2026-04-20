import clsx from 'clsx';
import { forwardRef } from 'react';
import s from './input.module.css';
import type { InputProps } from './input.types.ts';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isError, ...props }, ref) => {
    return <input ref={ref} className={clsx(s.input, className, isError && s.error)} {...props} />;
  },
);

Input.displayName = 'Input';
