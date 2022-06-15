import React from 'react';

export type RenderPropsCommonTypes = {
  className: string;
  style: React.CSSProperties;
};

export type CheckMissing<T extends readonly any[], U extends Record<string, any>> = {
  [K in keyof U]: K extends T[number] ? never : K;
}[keyof U] extends never
  ? T
  : T & 'Error: missing keys';
