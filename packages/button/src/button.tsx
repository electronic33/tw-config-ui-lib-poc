import React, { useState } from 'react';
import clsx from 'clsx';
import { RadixDialog, Trigger } from '@ags-ui-library-poc/dialog';
import { Spinner } from '@ags-ui-library-poc/loading-indicator';
import { buttonClasses } from './button.classes';
import { DefaultConfirmationDialogContent } from './components/default-confirmation-dialog-content';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
  isDisabled?: boolean;
  LoadingIndicatorElement?: React.ReactElement;
  loadingIndicatorPosition?: 'left' | 'right';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      isLoading,
      isDisabled,
      loadingIndicatorPosition = 'left',
      LoadingIndicatorElement,
      ...buttonHtmlProps
    },
    ref,
  ) => {
    const LoadingIndicator = LoadingIndicatorElement || (
      <Spinner
        className={clsx({
          [buttonClasses.leftIconMd]: loadingIndicatorPosition === 'left',
          [buttonClasses.rightIconMd]: loadingIndicatorPosition === 'right',
        })}
      />
    );

    return (
      <button
        disabled={isDisabled || isLoading}
        {...buttonHtmlProps}
        className={clsx(buttonClasses.base, className)}
        ref={ref}
      >
        {isLoading && loadingIndicatorPosition === 'left' && LoadingIndicator}
        {children}
        {isLoading && loadingIndicatorPosition === 'right' && LoadingIndicator}
      </button>
    );
  },
);

export type ButtonWithConfirmationProps = ButtonProps & {
  confirmationIsNotNeeded?: boolean;
  confirmationDialogTitle?: React.ReactNode;
  confirmationDialogDescription?: React.ReactNode;
  confirmationButtonText?: React.ReactNode;
  closeButtonText?: React.ReactNode;
  ConfirmationDialogComponent?: React.FunctionComponent;
};

export const ButtonWithConfirmation = ({
  confirmationIsNotNeeded,
  children,
  confirmationDialogTitle,
  confirmationDialogDescription,
  confirmationButtonText,
  closeButtonText,
  ...props
}: ButtonWithConfirmationProps) => {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  if (confirmationIsNotNeeded) {
    return <Button {...props}>{children}</Button>;
  }

  return (
    <RadixDialog
      isOpen={isConfirmationDialogOpen}
      onOpenChange={setIsConfirmationDialogOpen}
      trigger={
        <Trigger asChild>
          <Button {...props}>{children}</Button>
        </Trigger>
      }
    >
      <DefaultConfirmationDialogContent
        dialogTitle={confirmationDialogTitle}
        dialogDescription={confirmationDialogDescription}
        confirmButtonChild={confirmationButtonText}
        closeButtonChild={closeButtonText}
      />
    </RadixDialog>
  );
};
