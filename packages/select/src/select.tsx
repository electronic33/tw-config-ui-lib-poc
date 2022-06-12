import React, { useMemo } from 'react';
import './select.css';
import clsx from 'clsx';
import { Listbox } from '@headlessui/react';
import * as Select from '@radix-ui/react-select';
import { RenderPropsCommonTypes } from '@ags-ui-library-poc/utils';

export type RenderTriggerProps = {
  value: string;
  placeholder?: string;
};

export type RadixSelectProps<T> = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  renderTrigger?: ({ value }: RenderTriggerProps & RenderPropsCommonTypes) => React.ReactElement;
  renderIcon?: (props: RenderPropsCommonTypes) => React.ReactElement;
  renderValue?: (props: RenderPropsCommonTypes) => React.ReactElement;
};

export const RadixSelect = <T,>({
  value,
  onChange,
  placeholder,
  renderTrigger,
  renderIcon,
  renderValue,
}: RadixSelectProps<T>) => {
  const valueDomNode = useMemo(() => {
    if (renderValue) {
      return (
        <Select.Value className="select-value" asChild>
          {renderValue({ value, className: '' })}
        </Select.Value>
      );
    }

    return <Select.Value className="select-value" />;
  }, [value, renderValue]);

  const toggleIconDomNode = useMemo(() => {
    if (renderIcon) {
      return (
        <Select.Icon className="select-trigger-icon" asChild>
          {renderIcon({ className: '' })}
        </Select.Icon>
      );
    }

    return (
      <Select.Icon className="select-trigger-icon" asChild>
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Select.Icon>
    );
  }, [renderIcon]);

  const triggerDomNode = useMemo(() => {
    if (renderTrigger) {
      return renderTrigger({ value, placeholder });
    }

    return (
      <Select.Trigger className="select-trigger">
        {valueDomNode}
        {toggleIconDomNode}
      </Select.Trigger>
    );
  }, [renderTrigger, toggleIconDomNode, value, placeholder]);

  return (
    <Select.Root value={value} onValueChange={onChange}>
      {triggerDomNode}
      <Select.Content className="select-content">
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Item value="1">
            <Select.ItemText>Item 1</Select.ItemText>
            <Select.ItemIndicator>...</Select.ItemIndicator>
          </Select.Item>

          <Select.Group>
            <Select.Label>Group</Select.Label>
            <Select.Item value="2">
              <Select.ItemText>Item 2</Select.ItemText>
              <Select.ItemIndicator>...</Select.ItemIndicator>
            </Select.Item>
          </Select.Group>

          <Select.Separator />
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select.Root>
  );
};

export type HeadlessUiSelectProps<T, U> = {
  className?: string;
  selectHtmlProps?: React.InputHTMLAttributes<HTMLSelectElement>;
  disabled?: boolean;
  value: T;
  onChange: (value: T) => void;
};

const TestComp = (props) => {
  console.log('🚀 ~ file: select.tsx ~ line 118 ~ TestComp ~ props', props);
  return <button {...props} />;
};

export const HeadlessUiSelect = React.forwardRef<HTMLSelectElement, HeadlessUiSelectProps>(
  ({ selectHtmlProps, disabled, className, value, onChange }, ref) => {
    return (
      <Listbox value={value} onChange={onChange}>
        <Listbox.Label>Assignee:</Listbox.Label>
        <Listbox.Button className="test" as={TestComp}>
          Selected value
        </Listbox.Button>
        <Listbox.Options>
          {[
            { id: '1', name: 'Name 1' },
            { id: '2', name: 'Name 2' },
          ].map((person) => (
            <Listbox.Option key={person.id} value={person}>
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    );
  },
);
