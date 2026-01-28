import type React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'danger' | 'outline';
  isLoading?: boolean;
  icon?: React.ReactNode;
}
