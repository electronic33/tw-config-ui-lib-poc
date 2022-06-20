import React from 'react';
import clsx from 'clsx';

export type ButtonProps = {
  className?: string;
  buttonHtmlElementProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, className, style, onClick, ...props }, ref) => {
    return (
      <button
        type="button"
        className={clsx('button', className)}
        {...props}
        style={style}
        disabled={disabled}
        ref={ref}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);
