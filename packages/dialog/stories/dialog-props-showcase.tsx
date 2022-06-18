import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { PropsList } from '@ags-ui-library-poc/utils';

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
        defaultHtmlStructure,
        children: children ? `Has children (${React.Children.count(children)})` : 'No children',
        ...props,
      },
      propsKey,
    );
  }, [props, propsKey, defaultHtmlStructure, setShowcaseProps, children]);

  return <div {...props} children={children}></div>;
};

export const DialogPropsShowcase = () => {
  const [isComponentMounted, setIsComponentMounted] = useState(true);

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
    }, 1000);

    setTimeout(() => {
      setIsComponentMounted(false);
    }, 1500);
  }, []);

  useEffect(() => {}, []);

  return (
    <div id="dialog-props-showcase-root" className="flex flex-col">
      <iframe
        className="mb-5 pb-5 border-b-2 border-gray-400 h-[500px]"
        src="https://www.radix-ui.com/docs/primitives/components/dialog#anatomy"
      />
      <h1 className="text-2xl mb-6 text-gray-900">
        Props that get passed down to the asChild component
      </h1>
      <div id="dialog-props-showcase-root" className="flex flex-wrap space-x-4 space-y-4">
        <PropsList
          className="max-w-2xl"
          headingText="Trigger"
          propsToDisplay={componentProps.current.trigger}
        />
        <PropsList
          className="max-w-2xl"
          headingText="Overlay"
          propsToDisplay={componentProps.current.overlay}
        />
        <PropsList
          className="max-w-2xl"
          headingText="Content"
          propsToDisplay={componentProps.current.content}
        />
        <PropsList
          className="max-w-2xl"
          headingText="Title"
          propsToDisplay={componentProps.current.title}
        />
        <PropsList
          className="max-w-2xl"
          headingText="Description"
          propsToDisplay={componentProps.current.description}
        />
        <PropsList
          className="max-w-2xl"
          headingText="Close"
          propsToDisplay={componentProps.current.close}
        />
        {isComponentMounted && (
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
        )}
      </div>
    </div>
  );
};
