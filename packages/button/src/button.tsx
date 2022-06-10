import React from 'react';
import './button.css';
import clsx from 'clsx';

export type ButtonProps = {
  className?: string;
  buttonHtmlElementProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, buttonHtmlElementProps, disabled, className }, ref) => {
    return (
      <button
        {...buttonHtmlElementProps}
        className={clsx('btn', className)}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
