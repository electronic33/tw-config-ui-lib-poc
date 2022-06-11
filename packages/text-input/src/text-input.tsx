import React from 'react';
import './text-input.css';
import clsx from 'clsx';

export type TextInputProps = {
  className?: string;
  style?: React.CSSProperties;
  inputHtmlProps?: React.InputHTMLAttributes<HTMLInputElement>;
  disabled?: boolean;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ inputHtmlProps, disabled, className, style }, ref) => {
    return (
      <input
        {...inputHtmlProps}
        className={clsx('text-input', className)}
        style={style}
        disabled={disabled}
        ref={ref}
      />
    );
  },
);
