import type {SelectProps} from '@radix-ui/react-select';
import type {ReactNode} from 'react';

export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};


export type BaseSelectProps = SelectProps & {
    options: SelectOption[];
    label?: string;
    placeholder?: string;
    error?: string;
    className?: string;
    small?: boolean;
    icon?: ReactNode;
};