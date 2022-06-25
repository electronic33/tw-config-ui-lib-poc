import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import clsx from 'clsx';
import { dialogClasses } from './dialog.classes';

export * from '@radix-ui/react-dialog';
// export * from '@radix-ui/react-alert-dialog';

export type DialogProps = {
  /** Controls when the dialog is showing */
  isOpen: boolean;
  /** This gets called when the Dialog's open state changes */
  onOpenChange: (isOpen: boolean) => void;
  /** This element will get rendered as the Trigger for the Dialog */
  trigger?: React.ReactElement;
  /** The allowPinchZoom prop from react-remove-scroll. See their docs for information on functionality and limitations. */
  allowPinchZoom?: boolean;
  /** The container the Dialog will be rendered into using React.Portal. If not specified, document.body is used. */
  portalContainer?: HTMLElement;
  /** If you don't want to automatically focus the first element in the dialog, pass true. */
  disableAutoFocus?: boolean;
  /** This will be the content of the dialog */
  children: React.ReactNode;
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

export const RadixAlertDialog = ({ children, isOpen, onOpenChange, trigger }: DialogProps) => {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      {trigger}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={clsx(dialogClasses.overlay)}>
          <AlertDialog.Content className={clsx(dialogClasses.content)}>
            {children}
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
