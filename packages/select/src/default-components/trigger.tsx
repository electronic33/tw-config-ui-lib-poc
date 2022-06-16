import React from 'react';
import { getPropsWithKeys } from '@ags-ui-library-poc/utils';

export type TriggerComponentRadixProps = Partial<{
  type: 'button';
  role: string;
  'aria-controls': string;
  'aria-expanded': boolean;
  'aria-autocomplete': string;
  'aria-labelledby': string;
  'data-disabled': boolean | undefined;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
  disabled: boolean | undefined;
  dir: 'ltr' | 'rtl' | undefined;
  className: string;
}>;

export type TriggerComponentProps = TriggerComponentRadixProps & {
  children: React.ReactNode | React.ReactNode[];
};

export const getTriggerRadixProps = (props: TriggerComponentProps) =>
  getPropsWithKeys<keyof TriggerComponentRadixProps>(props, [
    'type',
    'role',
    'aria-controls',
    'aria-expanded',
    'aria-autocomplete',
    'aria-labelledby',
    'data-disabled',
    'onKeyDown',
    'onPointerDown',
    'disabled',
    'dir',
    'className',
  ]);

export const TriggerComponent = (props: TriggerComponentProps) => {
  return <button {...getTriggerRadixProps(props)}>{props.children}</button>;
};
