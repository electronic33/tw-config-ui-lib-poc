import React from 'react';
import './button.css';
import clsx from 'clsx';

export type ButtonProps = {
  className?: string;
  buttonHtmlElementProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, buttonHtmlElementProps, disabled, className, style }, ref) => {
    return (
      <button
        {...buttonHtmlElementProps}
        className={clsx('button', className)}
        style={style}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
