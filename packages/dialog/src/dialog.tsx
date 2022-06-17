import React from 'react';
import clsx from 'clsx';

export type DialogProps = {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Dialog = ({ children, className, style }: DialogProps) => {
  return (
    <div className={clsx('Dialog', className)} style={style}>
      {children}
    </div>
  );
};
