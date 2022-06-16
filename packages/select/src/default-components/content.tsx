import React from 'react';
import { getPropsWithKeys } from '@ags-ui-library-poc/utils';
import { Properties as CSSProperties } from 'csstype';

export type ContentComponentRadixProps = Partial<{
  // style: {
  //   display: CSS.Properties['display'];
  //   flexDirection: CSS.Properties['flexDirection'];
  // };
  style: Pick<
    CSSProperties,
    | 'display'
    | 'flexDirection'
    | 'zIndex'
    | 'position'
    | 'minWidth'
    | 'minHeight'
    | 'height'
    | 'left'
    | 'bottom'
    | 'margin'
    | 'maxHeight'
  >;
  // type: 'button';
  // role: string;
  // 'aria-controls': string;
  // 'aria-expanded': boolean;
  // 'aria-autocomplete': string;
  // 'aria-labelledby': string;
  // 'data-disabled': boolean | undefined;
  // onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  // onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
  // disabled: boolean | undefined;
  // dir: 'ltr' | 'rtl' | undefined;
  // className: string;
}>;

export type ContentComponentProps = ContentComponentRadixProps & {
  children: React.ReactNode | React.ReactNode[];
};

export const getTriggerRadixProps = (props: ContentComponentProps) =>
  getPropsWithKeys<keyof ContentComponentRadixProps>(props, [
    'style',
    // 'type',
    // 'role',
    // 'aria-controls',
    // 'aria-expanded',
    // 'aria-autocomplete',
    // 'aria-labelledby',
    // 'data-disabled',
    // 'onKeyDown',
    // 'onPointerDown',
    // 'disabled',
    // 'dir',
    // 'className',
  ]);

export const ContentComponent = (props: ContentComponentProps) => {
  console.log('🚀 ~ file: content.tsx ~ line 40 ~ ContentComponent ~ props', props);
  return <div>{props.children}</div>;
};
