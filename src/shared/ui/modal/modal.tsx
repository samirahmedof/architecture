import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type React from 'react';
import styles from './modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  trigger?: React.ReactNode; // Modalı açan düymə (optional)
}

export const Modal = ({ isOpen, onOpenChange, title, children, trigger }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      {/* Əgər trigger varsa, onu render et */}
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          {title && <Dialog.Title className={styles.title}>{title}</Dialog.Title>}

          {/* Modalın içi */}
          <div>{children}</div>

          <Dialog.Close asChild>
            <button className={styles.closeBtn} aria-label="Close" type="button">
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
