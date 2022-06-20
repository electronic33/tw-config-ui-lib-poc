import React, { useState } from 'react';
import clsx from 'clsx';
import { RadixDialog, Trigger } from '@ags-ui-library-poc/dialog';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
  isDisabled?: boolean;
  LoadingIndicatorComponent?: React.ReactElement;
  loadingIndicatorPosition?: 'left' | 'right';
  isConfirmationButton?: boolean;
};

export type SpinnerProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const Spinner = ({ className, style }: SpinnerProps) => {
  return (
    <svg
      className={clsx('animate-spin', className)}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      isLoading,
      isDisabled,
      loadingIndicatorPosition,
      LoadingIndicatorComponent,
      isConfirmationButton,
      ...buttonHtmlProps
    },
    ref,
  ) => {
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

    const LoadingIndicator = LoadingIndicatorComponent || (
      <Spinner
        className={clsx({
          'button-icon-left-md': loadingIndicatorPosition === 'left',
          'button-icon-right-md': loadingIndicatorPosition === 'right',
        })}
      />
    );

    const buttonDomNode = (
      <button
        className={clsx('button', className)}
        disabled={isDisabled || isLoading}
        {...buttonHtmlProps}
        ref={ref}
      >
        {isLoading && loadingIndicatorPosition === 'left' && LoadingIndicator}
        {children}
        {isLoading && loadingIndicatorPosition === 'right' && LoadingIndicator}
      </button>
    );

    if (!isConfirmationButton) {
      return buttonDomNode;
    }

    return (
      <RadixDialog
        isOpen={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
        trigger={<Trigger asChild>{buttonDomNode}</Trigger>}
      >
        <div>CONTINUE:</div>
      </RadixDialog>
    );
  },
);
