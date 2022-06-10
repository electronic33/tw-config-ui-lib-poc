import React from 'react';
import './button.css';
import clsx from 'clsx';

export type ButtonProps = {
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Button = ({ children, className }: ButtonProps) => {
  return <button className={clsx('btn', className)}>{children}</button>;
};
