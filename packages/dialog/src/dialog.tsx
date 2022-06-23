import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { dialogClasses } from './dialog.classes';

export * from '@radix-ui/react-dialog';

export type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  trigger?: React.ReactElement;
};

export const RadixDialog = ({ children, isOpen, onOpenChange, trigger }: DialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      {trigger}
      <Dialog.Portal>
        <Dialog.Overlay className={clsx(dialogClasses.overlay)}>
          <Dialog.Content className={clsx(dialogClasses.content)}>{children}</Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
