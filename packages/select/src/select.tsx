import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Listbox } from '@headlessui/react';
import * as Select from '@radix-ui/react-select';
import { TriggerComponent as DefaultTriggerComponent } from './default-components/trigger';
import { ValueComponent as DefaultValueComponent } from './default-components/value';
import { IconComponent as DefaultIconComponent } from './default-components/icon';
import { RenderPropsCommonTypes } from '@ags-ui-library-poc/utils';

type ValueTypeUnion = string;

type OptionItemType<ValueType extends ValueTypeUnion> = {
  type: 'item';
  value: ValueType;
  [key: string]: any;
};

type OptionSeparatorType = {
  type: 'separator';
  [key: string]: any;
};

type OptionGroupType<ValueType extends ValueTypeUnion> = {
  type: 'group';
  label: string;
  groupItems: (OptionItemType<ValueType> | OptionSeparatorType)[];
  [key: string]: any;
};

type Option<ValueType extends ValueTypeUnion> =
  | OptionSeparatorType
  | OptionItemType<ValueType>
  | OptionGroupType<ValueType>;

export type RadixSelectProps<ValueType extends ValueTypeUnion> = {
  value: ValueType;
  onChange: (
    newValue: ValueType,
    optionItem: OptionItemType<ValueType> | null,
  ) => void | React.ElementType;
  placeholder?: React.ReactNode;
  options: Option<ValueType>[];
  /* Be default it is selectedOption.value */
  getDisplayValueFromSelectedOption?: (
    selectedOption: OptionItemType<ValueType>,
  ) => string | number | null | React.ReactElement;
  renderTrigger?: (props: RenderPropsCommonTypes) => React.ReactElement;
  renderIcon?: (props: RenderPropsCommonTypes & { value: string }) => React.ReactElement;
  renderValue?: (props: RenderPropsCommonTypes & { value: string }) => React.ReactElement;
  components?: {
    Trigger?: React.FunctionComponent;
    Value?: React.FunctionComponent;
    Icon?: React.FunctionComponent;
    ItemText?: React.FunctionComponent;
    ItemIndicator?: React.FunctionComponent;
    Item?: React.FunctionComponent;
    Label?: React.FunctionComponent;
    Content?: React.FunctionComponent;
    ViewPort?: React.FunctionComponent;
    Group?: React.FunctionComponent;
    Separator?: React.FunctionComponent;
    ScrollDownButton?: React.FunctionComponent;
    ScrollUpButton?: React.FunctionComponent;
  };
  // componentClassNames?: {
  //   trigger: string | (() => string);
  //   value: string | (() => string);
  //   icon: string | (() => string);
  // };
  componentExtraProps?: {
    trigger?: Record<string, any>;
    value?: Record<string, any>;
    icon?: Record<string, any>;
    itemText?: Record<string, any>;
    itemIndicator?: Record<string, any>;
    item?: Record<string, any>;
    label?: Record<string, any>;
    content?: Record<string, any>;
    viewPort?: Record<string, any>;
    group?: Record<string, any>;
    separator?: Record<string, any>;
    scrollDownButton?: Record<string, any>;
    scrollUpButton?: Record<string, any>;
  };
};

export const RadixSelect = <ValueType extends ValueTypeUnion>({
  value,
  onChange,
  placeholder,
  renderTrigger,
  renderIcon,
  renderValue,
  components,
  componentExtraProps,
  options,
}: RadixSelectProps<ValueType>) => {
  const TriggerComponent = useMemo(
    () => components?.Trigger || DefaultTriggerComponent,
    [components?.Trigger],
  );
  const IconComponent = useMemo(() => components?.Icon || DefaultIconComponent, [components?.Icon]);
  const ValueComponent = useMemo(
    () => components?.Value || DefaultValueComponent,
    [components?.Value],
  );
  const ItemTextComponent = useMemo(
    () => components?.ItemText || DefaultItemTextComponent,
    [components?.ItemText],
  );
  const ItemIndicatorComponent = useMemo(
    () => components?.ItemIndicator || DefaultItemIndicatorComponent,
    [components?.ItemIndicator],
  );
  const ItemComponent = useMemo(() => components?.Item || DefaultItemComponent, [components?.Item]);
  const ContentComponent = useMemo(
    () => components?.Content || DefaultContentComponent,
    [components?.Content],
  );
  const ViewPortComponent = useMemo(
    () => components?.ViewPort || DefaultViewPortComponent,
    [components?.ViewPort],
  );
  const GroupComponent = useMemo(
    () => components?.Group || DefaultGroupComponent,
    [components?.Group],
  );
  const LabelComponent = useMemo(
    () => components?.Label || DefaultLabelComponent,
    [components?.Label],
  );
  const SeparatorComponent = useMemo(
    () => components?.Separator || DefaultSeparatorComponent,
    [components?.Separator],
  );
  const ScrollUpButtonComponent = useMemo(
    () => components?.ScrollUpButton || DefaultScrollUpButtonComponent,
    [components?.ScrollUpButton],
  );
  const ScrollDownButtonComponent = useMemo(
    () => components?.ScrollDownButton || DefaultScrollDownButtonComponent,
    [components?.ScrollDownButton],
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
      <Select.Value asChild>
        <ValueComponent className="select-value" value={value} {...componentExtraProps?.value} />
      </Select.Value>
    );
  }, [renderValue, ValueComponent, value, componentExtraProps?.value]);

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
      <Select.Icon asChild>
        <IconComponent className="select-trigger-icon" {...componentExtraProps?.icon} />
      </Select.Icon>
    );
  }, [renderIcon, IconComponent, componentExtraProps?.icon]);

  const TriggerDomNode = useMemo(() => {
    if (renderTrigger) {
      // @ts-ignore
      return renderTrigger({});
    }

    return (
      <Select.Trigger asChild>
        <TriggerComponent className="select-trigger" {...componentExtraProps?.trigger}>
          {ValueDomNode}
          {IconDomNode}
        </TriggerComponent>
      </Select.Trigger>
    );
  }, [renderTrigger, TriggerComponent, IconDomNode, ValueDomNode, componentExtraProps?.trigger]);

  // const ItemTextDomNode = useMemo(() => {
  //   return <Select.ItemText asChild></Select.ItemText>
  // }, []);

  const OptionsList = useMemo(() => {
    return options.map((option) => {
      if (option.type === 'separator') {
        return <Select.Separator />;
      }

      if (option.type === 'item') {
        return <Select.Item value={option.value} {...option} />;
      }

      return null;
    });
  }, [options]);

  return (
    <Select.Root
      value={value}
      onValueChange={(newValue) => {
        const selectedOption =
          options.reduce((option) => {
            if (option.type === 'item') {
              return option.value === newValue;
            }

            if (option.type === 'group') {
              return option.groupItems.find || false;
            }
            // TODO: continue finishing this
            return false;
          }) || null;

        onChange(newValue, option);
      }}
    >
      {TriggerDomNode}
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>{OptionsList}</Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
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
