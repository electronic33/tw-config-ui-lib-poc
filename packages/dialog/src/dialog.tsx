import React from 'react';
export * from '@radix-ui/react-dialog';

export type DialogProps = {
  children: React.ReactNode;
};

export const RadixDialog = ({ children }: DialogProps) => {
  return children;
};
