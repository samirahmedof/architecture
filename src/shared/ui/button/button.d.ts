import React, {ButtonHTMLAttributes} from 'react';
import type {VariantProps} from 'class-variance-authority';

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    icon?: React.ReactNode;
}