import clsx from 'clsx';
import { Loader2 } from 'lucide-react'; // Icon
import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './button.module.scss';

// Buttonun qəbul edəcəyi proplar
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'outline';
  isLoading?: boolean;
  icon?: ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.base,
          styles[variant], // dynamic class: styles.primary
          isLoading && styles.loading,
          className,
        )}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {/* Loading olanda fırlanan icon göstər */}
        {isLoading && <Loader2 className="animate-spin" size={16} />}

        {/* Loading yoxdursa və icon varsa göstər */}
        {!isLoading && icon && <span>{icon}</span>}

        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
