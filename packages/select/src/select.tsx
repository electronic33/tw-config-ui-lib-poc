import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Listbox } from '@headlessui/react';
import * as Select from '@radix-ui/react-select';
import { RenderPropsCommonTypes } from '@ags-ui-library-poc/utils';

export type HeadlessUiTriggerButtonRequiredProps = {
  id: string;
  type: 'submit' | 'reset' | 'button';
  'aria-haspopup': boolean;
  'aria-controls': string;
  'aria-expanded': boolean;
  'aria-labelledby': string;
  disabled: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

export type IconCommonProps = {
  className?: string;
  svgHtmlProps?: React.SVGAttributes<SVGElement>;
  as?: React.FunctionComponent<Omit<IconCommonProps, 'as'>>;
};

export const SelectTriggerIcon = ({
  className,
  svgHtmlProps,
  as: AsComponent,
}: IconCommonProps) => {
  if (AsComponent) {
    return <AsComponent className={className} svgHtmlProps={svgHtmlProps} />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...svgHtmlProps}
      className={clsx('h-5 w-5 text-gray-400 ml-3', className)}
    >
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export type RenderTriggerProps = {
  value: string;
  placeholder?: string;
};

export type RadixSelectProps = {
  value: string;
  onChange: (newValue: string) => void | React.ElementType;
  placeholder?: string;
  renderTrigger?: ({ value }: RenderPropsCommonTypes & RenderTriggerProps) => React.ReactElement;
  renderIcon?: (props: RenderPropsCommonTypes & { value: string }) => React.ReactElement;
  renderValue?: (props: RenderPropsCommonTypes & { value: string }) => React.ReactElement;
};

export const RadixSelect = ({
  value,
  onChange,
  placeholder,
  renderTrigger,
  renderIcon,
  renderValue,
}: RadixSelectProps) => {
  const valueDomNode = useMemo(() => {
    if (renderValue) {
      return (
        <Select.Value className="select-value" asChild>
          {renderValue({ value, className: '', style: {} })}
        </Select.Value>
      );
    }

    return <Select.Value className="select-value" />;
  }, [value, renderValue]);

  const toggleIconDomNode = useMemo(() => {
    if (renderIcon) {
      return (
        <Select.Icon className="select-trigger-icon" asChild>
          {renderIcon({ className: '', style: {}, value })}
        </Select.Icon>
      );
    }

    return (
      <Select.Icon className="select-trigger-icon" asChild>
        <SelectTriggerIcon />
      </Select.Icon>
    );
  }, [renderIcon, value]);

  const triggerDomNode = useMemo(() => {
    if (renderTrigger) {
      return renderTrigger({ value, placeholder, style: {}, className: '' });
    }

    return (
      <Select.Trigger className="select-trigger">
        {valueDomNode}
        {toggleIconDomNode}
      </Select.Trigger>
    );
  }, [renderTrigger, toggleIconDomNode, value, valueDomNode, placeholder]);

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

export type TriggerComponentType<T extends Record<string, any>> = React.FunctionComponent<{
  requiredProps: HeadlessUiTriggerButtonRequiredProps;
  extraProps?: T;
}>;

export type HeadlessUiSelectProps<
  ValueType,
  TriggerComponentExtraPropsType extends Record<string, any>,
> = {
  disabled?: boolean;
  value: ValueType;
  getTriggerValue: (value: ValueType) => string;
  withNoTriggerIcon?: boolean;
  onChange: (value: ValueType) => void;
  options: ValueType[];
  label?: string;
  labelClassName?: string;
  LabelComponent?: React.FunctionComponent;
  placeholder?: string;
  placeholderClassName?: string;
  TriggerComponent?: React.FunctionComponent<{
    requiredProps: HeadlessUiTriggerButtonRequiredProps;
    extraProps?: TriggerComponentExtraPropsType;
  }>;
  triggerComponentExtraProps?: TriggerComponentExtraPropsType;
  triggerClassName?: string;
  TriggerValueComponent?: React.FunctionComponent<{
    className: string;
    isPlaceholderApplicable: boolean;
  }>;
  triggerValueClassName?: string;
  TriggerIconComponent?: React.FunctionComponent;
  triggerIconClassName?: string;
};

export const HeadlessUiSelect = <ValueType, TriggerComponentExtraPropsType>({
  // Root level related props
  disabled,
  value,
  onChange,
  // Label related props
  label,
  LabelComponent,
  labelClassName,
  // Trigger related props
  TriggerComponent,
  triggerClassName,
  triggerComponentExtraProps,
  // Trigger value related props
  TriggerValueComponent,
  triggerValueClassName,
  placeholder,
  getTriggerValue,
  // Trigger icon related props
  TriggerIconComponent,
  triggerIconClassName,
  withNoTriggerIcon,
}: HeadlessUiSelectProps<ValueType, TriggerComponentExtraPropsType>) => {
  const isPlaceholderApplicable = useMemo(() => {
    if (!placeholder) {
      return false;
    }

    if (!getTriggerValue(value)) {
      return false;
    }

    return true;
  }, [value, placeholder, getTriggerValue]);

  const labelDomNode = useMemo(() => {
    const labelProps = {
      className: clsx('select-label', labelClassName),
    };

    if (LabelComponent) {
      <Listbox.Label {...labelProps} as={LabelComponent} />;
    }

    if (label) {
      <Listbox.Label {...labelProps}>{label}</Listbox.Label>;
    }

    return null;
  }, [label, LabelComponent, labelClassName]);

  const triggerIconDomNode = useMemo(() => {
    if (withNoTriggerIcon) {
      return null;
    }

    const FinalIcon = TriggerIconComponent || SelectTriggerIcon;

    return <FinalIcon className={clsx('select-trigger-icon', triggerIconClassName)} />;
  }, [withNoTriggerIcon, TriggerIconComponent, triggerIconClassName]);

  const triggerValueDomNode = useMemo(() => {
    if (TriggerValueComponent) {
      return (
        <TriggerValueComponent
          isPlaceholderApplicable={isPlaceholderApplicable}
          className={clsx(triggerValueClassName)}
        />
      );
    }

    return (
      <span
        className={clsx('select-trigger-value', triggerValueClassName, {
          'text-gray-400': isPlaceholderApplicable,
        })}
      >
        {isPlaceholderApplicable ? placeholder : getTriggerValue(value)}
      </span>
    );
  }, [
    value,
    getTriggerValue,
    TriggerValueComponent,
    triggerValueClassName,
    placeholder,
    isPlaceholderApplicable,
  ]);

  const triggerDomNode = useMemo(() => {
    if (TriggerComponent) {
      const WrappedTriggerComponent = (props: HeadlessUiTriggerButtonRequiredProps) => {
        console.log({ props });

        return <TriggerComponent requiredProps={props} extraProps={triggerComponentExtraProps} />;
      };

      return (
        <Listbox.Button
          className={clsx('select-trigger', triggerClassName)}
          type="button"
          as={WrappedTriggerComponent}
        >
          {triggerValueDomNode}
          {triggerIconDomNode}
        </Listbox.Button>
      );
    }

    return (
      <Listbox.Button
        // @ts-ignore
        className={('select-trigger', triggerClassName)}
        extraProps={{ any: 1 }}
        type="button"
        as={TriggerComponent}
      >
        {triggerValueDomNode}
        {triggerIconDomNode}
      </Listbox.Button>
    );
  }, [
    TriggerComponent,
    triggerIconDomNode,
    triggerValueDomNode,
    triggerClassName,
    triggerComponentExtraProps,
  ]);

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {labelDomNode}
      {triggerDomNode}
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
};
