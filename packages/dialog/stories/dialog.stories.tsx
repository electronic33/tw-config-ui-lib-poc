import React, { AriaAttributes, CSSProperties } from 'react';
import { Dialog as RadixDialog } from '../src';
import * as Dialog from '@radix-ui/react-dialog';
import { DialogPropsShowcase } from './dialog-props-showcase';

export default {
  title: 'Dialog',
  component: Dialog,
};

type TriggerComponentProps = Partial<
  {
    'aria-controls': string;
    'aria-expanded': boolean;
    'aria-haspopup': AriaAttributes['aria-haspopup'];
    'data-state': 'string';
    type: 'button';
    onClick: () => void;
  } & {
    children?: React.ReactNode;
  }
>;

const TriggerComponent = (props: TriggerComponentProps) => {
  // console.log({ props });

  return <button {...props}>Trigger</button>;
};

type OverlayComponentProps = Partial<
  {
    'data-state': string;
    'data-aria-hidden': boolean;
    'aria-hidden': boolean;
    onScrollCapture: () => void;
    onTouchMoveCapture: () => void;
    onWheelCapture: () => void;
    style: {
      pointerEvents: CSSProperties['pointerEvents'];
    };
  } & {
    className: string;
  }
>;

const OverlayComponent = (props: OverlayComponentProps) => {
  // console.log({ props });

  return <div {...props}></div>;
};

type ContentComponentProps = Partial<
  {
    /* Example: radix-150 */
    'aria-describedby': string;
    /* Example: radix-151 */
    'aria-labelleby': string;
    /* Example: radix-148 */
    id: string;
    onBlurCapture: () => void;
    onFocusCapture: () => void;
    onPointerDownCapture: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    style: {
      pointerEvents: CSSProperties['pointerEvents'];
    };
    role: 'dialog';
    tabIndex: number;
  } & {
    className: string;
    children?: React.ReactNode | React.ReactNode[];
  }
>;

const ContentComponent = (props: ContentComponentProps) => {
  return <div {...props}></div>;
};

type TitleComponentProps = Partial<
  {
    /* Example: radix-174 */
    id: string;
  } & {
    className: string;
    children?: React.ReactNode | React.ReactNode[];
  }
>;

const TitleComponent = (props: TitleComponentProps) => {
  return <h2 {...props}></h2>;
};

type DescriptionComponentProps = Partial<
  {
    /* Example: radix-174 */
    id: string;
  } & {
    className: string;
    children?: React.ReactNode | React.ReactNode[];
  }
>;

const DescriptionComponent = (props: DescriptionComponentProps) => {
  console.log({ props });

  return <h5 {...props}></h5>;
};

export const Default = (): React.ReactNode => {
  return (
    <div className="flex space-x-4">
      <DialogPropsShowcase />
      {/* <div className="flex flex-col space-y-4 items-start">
        <RadixDialog>Any</RadixDialog>
      </div> */}
      <div className="flex flex-col space-y-4 items-start">
        <Dialog.Root open={false}>
          <Dialog.Trigger asChild>
            <TriggerComponent />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="my-overlay fixed top-0 right-0 left-0 bottom-0" asChild>
              <OverlayComponent />
            </Dialog.Overlay>
            <Dialog.Content asChild className="custom-content">
              <ContentComponent>
                <Dialog.Title className="custom-title" asChild>
                  <TitleComponent children="Custom title" />
                </Dialog.Title>
                <Dialog.Description className="custom-description" asChild>
                  <DescriptionComponent children="Custom description" />
                </Dialog.Description>
                <Dialog.Close />
              </ContentComponent>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <div className="flex flex-col space-y-4 items-start">
        <Dialog.Root open>
          <Dialog.Trigger>Trigger 2</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="default-overlay bg-gray-400/25" />
            <Dialog.Content>
              <Dialog.Title>Default Title</Dialog.Title>
              <Dialog.Description>Default Description</Dialog.Description>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};
