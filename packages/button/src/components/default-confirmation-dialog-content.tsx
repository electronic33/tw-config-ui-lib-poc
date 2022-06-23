import {
  DialogDescription,
  DialogTitle,
  dialogClasses,
  DialogClose,
} from '@ags-ui-library-poc/dialog';
import clsx from 'clsx';
import React from 'react';
import { Button } from '../button';
import { buttonClasses } from '../button.classes';

export type DefaultConfirmationDialogProps = {
  dialogTitle: React.ReactNode;
  dialogDescription?: React.ReactNode;
  closeButtonChild?: React.ReactNode;
  confirmButtonChild?: React.ReactNode;
};

export const DefaultConfirmationDialogContent = ({
  dialogTitle,
  dialogDescription,
  closeButtonChild,
  confirmButtonChild,
}: DefaultConfirmationDialogProps) => {
  return (
    <div className="flex flex-col">
      <DialogTitle className={clsx(dialogClasses.title)}>{dialogTitle}</DialogTitle>
      {dialogDescription && (
        <DialogDescription className={clsx(dialogClasses.description)}>
          {dialogDescription}
        </DialogDescription>
      )}
      <div className="flex justify-end">
        <DialogClose>
          <Button
            className={clsx(buttonClasses.sizeMd, buttonClasses.colorNeutralOutlined, 'mr-3')}
          >
            {closeButtonChild || 'Close'}
          </Button>
        </DialogClose>
        <Button className={clsx(buttonClasses.sizeMd, buttonClasses.colorPrimaryFilled)}>
          {confirmButtonChild || 'Confirm'}
        </Button>
      </div>
    </div>
  );
};
