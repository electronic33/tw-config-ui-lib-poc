import React, { useState } from 'react';
import clsx from 'clsx';
import { RadixDialog, Trigger, Title, Description, Close } from '@ags-ui-library-poc/dialog';
import { Spinner } from '@ags-ui-library-poc/loading-indicator';

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
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

    const LoadingIndicator = LoadingIndicatorElement || (
      <Spinner
        className={clsx({
          'button-icon-left-md': loadingIndicatorPosition === 'left',
          'button-icon-right-md': loadingIndicatorPosition === 'right',
        })}
      />
    );

    return (
      <button
        disabled={isDisabled || isLoading}
        {...buttonHtmlProps}
        className={clsx('button', className)}
        ref={ref}
      >
        {isLoading && loadingIndicatorPosition === 'left' && LoadingIndicator}
        {children}
        {isLoading && loadingIndicatorPosition === 'right' && LoadingIndicator}
      </button>
    );
  },
);

export type ConfirmationButtonProps = Omit<ButtonProps, 'onClick' | 'onKeyDown'> & {
  isActive?: boolean;
};

export const ConfirmationButton = ({ isActive, children, ...props }: ConfirmationButtonProps) => {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  return (
    <RadixDialog
      isOpen={isConfirmationDialogOpen}
      onOpenChange={setIsConfirmationDialogOpen}
      trigger={
        <Trigger asChild>
          <Button
            {...props}
            onClick={() => {
              console.log('I GET CLICKED');
            }}
          >
            {children}
          </Button>
        </Trigger>
      }
    >
      <Title>Are you sure?</Title>
      <Description>By deleting this you will...</Description>
      <div className="flex">
        <Close asChild>
          <Button>Close</Button>
        </Close>
        <Button>Proceed</Button>
      </div>
    </RadixDialog>
  );
};
