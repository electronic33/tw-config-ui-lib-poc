import React from 'react';
import { getPropsWithKeys } from '@ags-ui-library-poc/utils';

export type ValueComponentRadixProps = Partial<{
  style: {
    pointerEvent: React.CSSProperties['pointerEvents'];
  };
  className: string;
}>;

export type ValueComponentProps = ValueComponentRadixProps & {
  value: string;
};

export const getValueRadixProps = (props: ValueComponentProps) =>
  getPropsWithKeys<keyof ValueComponentRadixProps>(props, ['style']);

export const ValueComponent = (props: ValueComponentProps) => {
  return <span {...getValueRadixProps(props)}>{props.value}</span>;
};
