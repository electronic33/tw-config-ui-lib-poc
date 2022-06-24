import React, { useState } from 'react';
import clsx from 'clsx';
import { RadixDialog, Trigger } from '@ags-ui-library-poc/dialog';
import { Spinner } from '@ags-ui-library-poc/loading-indicator';
import { buttonClasses } from './button.classes';
import {
  DefaultConfirmationDialogContent,
  DefaultConfirmationDialogProps,
} from './components/default-confirmation-dialog-content';

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

type ConfirmationDialogSlot<T> = T extends React.FunctionComponent<infer P>
  ? {
      ConfirmationDialogComponent: T;
      confirmationDialogProps?: P;
    }
  : {
      ConfirmationDialogComponent?: typeof DefaultConfirmationDialogContent;
      confirmationDialogProps: DefaultConfirmationDialogProps;
    };

export type ButtonWithConfirmationProps<ConfirmationDialogComponent> = ButtonProps & {
  confirmationIsNotNeeded?: boolean;
} & ConfirmationDialogSlot<ConfirmationDialogComponent>;

type AssertCorretProps<Component, OtherProps> =
  Component extends typeof DefaultConfirmationDialogContent
    ? DefaultConfirmationDialogProps & React.ComponentProps<Component>
    : OtherProps;

export const ButtonWithConfirmation = <
  T extends React.JSXElementConstructor<any> | keyof JSX.IntrinsicElements,
>({
  ConfirmationDialogComponent = DefaultConfirmationDialogContent,
  confirmationDialogProps,
  confirmationIsNotNeeded,
  children,
  ...props
}: ButtonWithConfirmationProps<T>) => {
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
      <ConfirmationDialogComponent
        {...(confirmationDialogProps as AssertCorretProps<
          typeof ConfirmationDialogComponent,
          React.ComponentProps<T>
        >)}
      />
    </RadixDialog>
  );
};
