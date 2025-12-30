import * as SelectPrimitive from '@radix-ui/react-select';
import {clsx} from 'clsx';
import {ChevronDown, ChevronDownIcon, ChevronUpIcon} from 'lucide-react';
import s from './select.module.scss';
import type {BaseSelectProps} from './select.types';


export const Select = (
    {
        options,
        placeholder = 'Seçin...',
        label,
        error,
        className,
        disabled,
        small,
        ...props
    }: BaseSelectProps) => {
    return (
        <div className={clsx(s.container, className)}>
            {label && <label className={s.label}>{label}</label>}

            <SelectPrimitive.Root disabled={disabled} {...props}>
                <SelectPrimitive.Trigger
                    className={clsx(s.trigger, error && s.error, small && s.small)}
                >
                    <SelectPrimitive.Value placeholder={placeholder}/>
                    <SelectPrimitive.Icon className={s.icon}>
                        <ChevronDown size={16}/>
                    </SelectPrimitive.Icon>
                </SelectPrimitive.Trigger>

                <SelectPrimitive.Portal>
                    <SelectPrimitive.Content
                        className={s.content}
                    >
                        <SelectPrimitive.ScrollUpButton className={clsx(s.scroll, s.up)}>
                            <ChevronUpIcon size={16}/>
                        </SelectPrimitive.ScrollUpButton>
                        <SelectPrimitive.Viewport className={s.viewport}>
                            {options.map((option) => (
                                <SelectPrimitive.Item
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    className={s.item}
                                >
                                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                                </SelectPrimitive.Item>
                            ))}
                        </SelectPrimitive.Viewport>
                        <SelectPrimitive.ScrollDownButton className={clsx(s.scroll, s.down)}>
                            <ChevronDownIcon/>
                        </SelectPrimitive.ScrollDownButton>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
            </SelectPrimitive.Root>

            {error && <span className={s.errorMessage}>{error}</span>}
        </div>
    )
}
