import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Listbox } from '@headlessui/react';
import * as Select from '@radix-ui/react-select';
import { TriggerComponent as DefaultTriggerComponent } from './default-components/trigger';
import { ValueComponent as DefaultValueComponent } from './default-components/value';
import { IconComponent as DefaultIconComponent } from './default-components/icon';
import { RenderPropsCommonTypes } from '@ags-ui-library-poc/utils';

export type RadixSelectProps = {
  value: string;
  onChange: (newValue: string) => void | React.ElementType;
  placeholder?: string;
  renderTrigger?: ({ value }: RenderPropsCommonTypes & RenderTriggerProps) => React.ReactElement;
  renderIcon?: (props: RenderPropsCommonTypes & { value: string }) => React.ReactElement;
  renderValue?: (props: RenderPropsCommonTypes & { value: string }) => React.ReactElement;
  components?: {
    Icon?: React.FunctionComponent;
    Value?: React.FunctionComponent;
    Trigger?: React.FunctionComponent;
  };
};

export const RadixSelect = ({
  value,
  onChange,
  placeholder,
  renderTrigger,
  renderIcon,
  renderValue,
  components,
}: RadixSelectProps) => {
  const TriggerComponent = useMemo(
    () => components?.Trigger || DefaultTriggerComponent,
    [components?.Trigger],
  );
  const IconComponent = useMemo(() => components?.Icon || DefaultIconComponent, [components?.Icon]);
  const ValueComponent = useMemo(
    () => components?.Value || DefaultValueComponent,
    [components?.Value],
  );

  const isPlaceholderApplicable = useMemo(() => {
    if (!placeholder) {
      return false;
    }

    // if (!getTriggerValue(value)) {
    //   return false;
    // }

    if (!value) {
      return false;
    }

    return true;
  }, [value, placeholder]);

  const ValueDomNode = useMemo(() => {
    if (renderValue) {
      return (
        <Select.Value className="select-value" asChild>
          {/* @ts-ignore */}
          {renderValue({ className: '', style: {} })}
        </Select.Value>
      );
    }

    return (
      <Select.Value className="select-value" asChild>
        <ValueComponent value={value} />
      </Select.Value>
    );
  }, [renderValue, ValueComponent, value]);

  const IconDomNode = useMemo(() => {
    if (renderIcon) {
      return (
        <Select.Icon className="select-trigger-icon" asChild>
          {/* @ts-ignore */}
          {renderIcon({})}
        </Select.Icon>
      );
    }

    return (
      <Select.Icon className="select-trigger-icon" asChild>
        <IconComponent />
      </Select.Icon>
    );
  }, [renderIcon, IconComponent]);

  const triggerDomNode = useMemo(() => {
    if (renderTrigger) {
      // @ts-ignore
      return renderTrigger({});
    }

    return (
      <Select.Trigger className="select-trigger" asChild>
        <TriggerComponent>
          {ValueDomNode}
          {IconDomNode}
        </TriggerComponent>
      </Select.Trigger>
    );
  }, [renderTrigger, TriggerComponent, IconDomNode, ValueDomNode]);

  return (
    <Select.Root
      value={value}
      onValueChange={(newValue) => {
        // const foundValue = options.find((option) => option.value === value);
        onChange(newValue);
      }}
    >
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

//////////////////// HEADLESS UI

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
  className: string;
  children: React.ReactNode;
};

export type TriggerComponentType<
  ExtraPropsType extends Record<string, any>,
  ValueType,
> = React.FunctionComponent<{
  requiredProps: HeadlessUiTriggerButtonRequiredProps;
  internalProps: {
    value: ValueType;
    isOpen: boolean;
  };
  extraProps?: ExtraPropsType;
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
  TriggerComponent?: TriggerComponentType<TriggerComponentExtraPropsType, ValueType>;
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
      const WrappedTriggerComponent = (requiredProps: HeadlessUiTriggerButtonRequiredProps) => {
        // console.log({ requiredProps });

        return (
          <TriggerComponent
            requiredProps={{
              ...requiredProps,
              className: clsx('select-trigger', triggerClassName),
            }}
            extraProps={triggerComponentExtraProps}
            internalProps={{
              isOpen: true,
              value,
            }}
          />
        );
      };

      return (
        // @ts-ignore: declare or patch some types to fix this
        <Listbox.Button as={WrappedTriggerComponent}>
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
    value,
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
