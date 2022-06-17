import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

type SetShowcasePropsType = {
  setShowcaseProps: (props: Record<string, any>, key: string) => void;
  propsKey: string;
  children?: React.ReactNode | React.ReactNode[];
  defaultHtmlStructure: string;
  [key: string]: any;
};

const PropsShowcaseComponent = ({
  setShowcaseProps,
  propsKey,
  children,
  defaultHtmlStructure,
  ...props
}: SetShowcasePropsType) => {
  useEffect(() => {
    setShowcaseProps(
      {
        ...props,
        defaultHtmlStructure,
        children: children
          ? `Number of children: ${React.Children.count(children)}`
          : 'No children',
      },
      propsKey,
    );
  }, [props, propsKey, defaultHtmlStructure, setShowcaseProps, children]);

  return <div {...props} children={children}></div>;
};

export const DialogPropsShowcase = () => {
  const [_, setForceUpdate] = useState(0);
  const componentProps = useRef({
    trigger: {},
    overlay: {},
    content: {},
    title: {},
    description: {},
    close: {},
  });

  const setShowcaseProps = useCallback((props: any, key: string) => {
    componentProps.current[key] = props;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setForceUpdate((cs) => cs + 1);
    }, 50);

    setTimeout(() => {
      setForceUpdate((cs) => cs + 1);
    }, 2000);
  }, []);

  return (
    <div id="dialog-props-showcase-root">
      <p>{JSON.stringify(componentProps.current, null, 2)}</p>
      <Dialog.Root open>
        <Dialog.Trigger asChild>
          <PropsShowcaseComponent
            setShowcaseProps={setShowcaseProps}
            propsKey="trigger"
            defaultHtmlStructure="<button>{children}</button>"
          />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <PropsShowcaseComponent
              setShowcaseProps={setShowcaseProps}
              propsKey="overlay"
              defaultHtmlStructure="<div></div>"
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <PropsShowcaseComponent
              setShowcaseProps={setShowcaseProps}
              propsKey="content"
              defaultHtmlStructure="<div>{children}</div>"
            >
              <Dialog.Title asChild>
                <PropsShowcaseComponent
                  setShowcaseProps={setShowcaseProps}
                  propsKey="title"
                  defaultHtmlStructure="<h2>{children}</h2>"
                />
              </Dialog.Title>
              <Dialog.Description asChild>
                <PropsShowcaseComponent
                  setShowcaseProps={setShowcaseProps}
                  propsKey="description"
                  defaultHtmlStructure="<p>{children}</p>"
                />
              </Dialog.Description>
              <Dialog.Close>
                <PropsShowcaseComponent
                  setShowcaseProps={setShowcaseProps}
                  propsKey="close"
                  defaultHtmlStructure="<button>{children}</button>"
                />
              </Dialog.Close>
            </PropsShowcaseComponent>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
