import React, { AriaAttributes, CSSProperties, useState } from 'react';
import * as Dialog from '../src';
import { DialogPropsShowcase } from './dialog-props-showcase';

export default {
  title: 'Dialog',
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
  // console.log({ props });

  return <h5 {...props}></h5>;
};

export const Showcase = (): React.ReactNode => {
  return <DialogPropsShowcase />;
};

export const Legit = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button className="mb-6 focus:ring-4 ring-blue-600" onClick={() => setIsOpen(true)}>
        Another trigger
      </button>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        {/* <Dialog.Trigger>Trigger</Dialog.Trigger> */}
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay">
            <Dialog.Content className="dialog-content">
              <Dialog.Title className="dialog-title">Confirmation required</Dialog.Title>
              <Dialog.Description className="dialog-description">
                You are about to delete item with name <b>Black Vinyl Coat</b>. This action is
                irreversible.
              </Dialog.Description>
              <Dialog.Close className="dialog-close">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="100%"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z" />
                </svg>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export const Default = (): React.ReactNode => {
  return (
    <div className="flex space-x-4">
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
