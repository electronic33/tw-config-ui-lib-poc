import React from 'react';
import clsx from 'clsx';

export type TemplateProps = {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Template = ({ children, className, style }: TemplateProps) => {
  return (
    <div className={clsx('Template', className)} style={style}>
      {children}
    </div>
  );
};
