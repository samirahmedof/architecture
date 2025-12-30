import type {ComponentProps} from 'react';

export type SidebarProps = ComponentProps<'aside'> & {
    isOpen: boolean;
}