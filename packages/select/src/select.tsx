import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { Listbox } from '@headlessui/react';
import * as Select from '@radix-ui/react-select';
import { TriggerComponent as DefaultTriggerComponent } from './default-components/trigger';
import { ValueComponent as DefaultValueComponent } from './default-components/value';
import { IconComponent as DefaultIconComponent } from './default-components/icon';
import { ContentComponent as DefaultContentComponent } from './default-components/content';
import { ViewportComponent as DefaultViewportComponent } from './default-components/viewport';
import { ScrollUpButtonComponent as DefaultScrollUpButtonComponent } from './default-components/scroll-up-button';
import { ScrollDownButtonComponent as DefaultScrollDownButtonComponent } from './default-components/scroll-down-button';
import { ItemComponent as DefaultItemComponent } from './default-components/item';
import { ItemTextComponent as DefaultItemTextComponent } from './default-components/item-text';
import { ItemIndicatorComponent as DefaultItemIndicatorComponent } from './default-components/item-indicator';
import { GroupComponent as DefaultGroupComponent } from './default-components/group';
import { LabelComponent as DefaultLabelComponent } from './default-components/label';
import { SeparatorComponent as DefaultSeparatorComponent } from './default-components/separator';

type OptionItemType = {
  type: 'item';
  value: string;
  [key: string]: any;
};

type OptionSeparatorType = {
  type: 'separator';
  [key: string]: any;
};

type OptionGroupType = {
  type: 'group';
  label: string;
  groupItems: (OptionItemType | OptionSeparatorType)[];
  [key: string]: any;
};

type Option = OptionSeparatorType | OptionItemType | OptionGroupType;

export type RadixSelectProps = {
  value: string;
  onChange: (newValue: string, optionItem: OptionItemType | null) => void | React.ElementType;
  placeholder?: React.ReactNode;
  options: Option[];
  /* By default it's selectedOption.value */
  getDisplayValueFromSelectedOption?: (
    selectedOption: OptionItemType,
  ) => string | number | null | React.ReactElement;
  components?: {
    Trigger?: React.FunctionComponent;
    Value?: React.FunctionComponent;
    Icon?: React.FunctionComponent;
    ItemText?: React.FunctionComponent;
    ItemIndicator?: React.FunctionComponent;
    Item?: React.FunctionComponent;
    Label?: React.FunctionComponent;
    Content?: React.FunctionComponent;
    Viewport?: React.FunctionComponent;
    Group?: React.FunctionComponent;
    Separator?: React.FunctionComponent;
    ScrollDownButton?: React.FunctionComponent;
    ScrollUpButton?: React.FunctionComponent;
  };
  componentExtraProps?: {
    trigger?: Record<string, any>;
    value?: Record<string, any>;
    icon?: Record<string, any>;
    itemText?: Record<string, any>;
    itemIndicator?: Record<string, any>;
    item?: Record<string, any>;
    label?: Record<string, any>;
    content?: Record<string, any>;
    viewport?: Record<string, any>;
    group?: Record<string, any>;
    separator?: Record<string, any>;
    scrollDownButton?: Record<string, any>;
    scrollUpButton?: Record<string, any>;
  };
};

export const RadixSelect = ({
  value,
  onChange,
  placeholder,
  components,
  componentExtraProps,
  options,
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
  const ViewportComponent = useMemo(
    () => components?.Viewport || DefaultViewportComponent,
    [components?.Viewport],
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

  const getSelectedOptionForValue = useCallback(
    (v: string) => {
      for (let i = 0; i < options.length; i += 1) {
        const iterationOption = options[i];

        if (iterationOption.type === 'item' && iterationOption.value === v) {
          return iterationOption;
        }

        if (iterationOption.type === 'group') {
          for (let j = 0; j < iterationOption.groupItems.length; j += 1) {
            const iterationOptionGroupItem = iterationOption.groupItems[j];

            if (iterationOptionGroupItem.type === 'item' && iterationOptionGroupItem.value === v) {
              return iterationOptionGroupItem;
            }
          }
        }
      }

      return null;
    },
    [options],
  );

  const selectedOptionForValue = useMemo(
    () => getSelectedOptionForValue(value),
    [getSelectedOptionForValue, value],
  );

  const isPlaceholderApplicable = useMemo(() => {
    if (!placeholder) {
      return false;
    }

    if (!getSelectedOptionForValue(value)) {
      return false;
    }

    return true;
  }, [value, placeholder, getSelectedOptionForValue]);

  return (
    <Select.Root
      value={value}
      onValueChange={(newValue) => {
        onChange(newValue, getSelectedOptionForValue(newValue));
      }}
    >
      <Select.Trigger asChild>
        <TriggerComponent className="select-trigger" {...componentExtraProps?.trigger}>
          <Select.Value asChild>
            <ValueComponent
              className="select-value"
              value={value}
              {...componentExtraProps?.value}
            />
          </Select.Value>
          <Select.Icon asChild>
            <IconComponent className="select-trigger-icon" {...componentExtraProps?.icon} />
          </Select.Icon>
        </TriggerComponent>
      </Select.Trigger>
      {/* <Select.Content asChild>
        <ContentComponent {...componentExtraProps?.content}>
          <Select.ScrollUpButton asChild>
            <ScrollUpButtonComponent {...componentExtraProps?.scrollUpButton} />
          </Select.ScrollUpButton>
          <Select.Viewport asChild>
            <ViewportComponent {...componentExtraProps?.viewport}>
              {options.map((option, index) => {
                if (option.type === 'separator') {
                  return (
                    <Select.Separator key={index} asChild {...componentExtraProps?.separator}>
                      <SeparatorComponent {...componentExtraProps?.separator} />
                    </Select.Separator>
                  );
                }

                if (option.type === 'item') {
                  return (
                    <Select.Item key={index} value={option.value} asChild>
                      <ItemComponent {...componentExtraProps?.item}>
                        <Select.ItemText asChild>
                          <ItemTextComponent {...componentExtraProps?.itemText} />
                        </Select.ItemText>
                        <Select.ItemIndicator asChild>
                          <ItemIndicatorComponent {...componentExtraProps?.itemIndicator} />
                        </Select.ItemIndicator>
                      </ItemComponent>
                    </Select.Item>
                  );
                }

                if (option.type === 'group') {
                  return (
                    <Select.Group asChild>
                      <GroupComponent {...componentExtraProps?.group}>
                        {option.label && (
                          <Select.Label asChild>
                            <LabelComponent {...componentExtraProps?.label} />
                          </Select.Label>
                        )}
                        {option.groupItems.map((groupItem, groupIndex) => (
                          <Select.Item
                            key={`${index}-${groupIndex}`}
                            value={groupItem.value}
                            asChild
                          >
                            <ItemComponent {...componentExtraProps?.item}>
                              <Select.ItemText asChild>
                                <ItemTextComponent {...componentExtraProps?.itemText} />
                              </Select.ItemText>
                              <Select.ItemIndicator asChild>
                                <ItemIndicatorComponent {...componentExtraProps?.itemIndicator} />
                              </Select.ItemIndicator>
                            </ItemComponent>
                          </Select.Item>
                        ))}
                      </GroupComponent>
                    </Select.Group>
                  );
                }

                return null;
              })}
            </ViewportComponent>
          </Select.Viewport>
          <Select.ScrollDownButton asChild>
            <ScrollDownButtonComponent {...componentExtraProps?.scrollDownButton} />
          </Select.ScrollDownButton>
        </ContentComponent>
      </Select.Content> */}
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

    if (TriggerIconComponent) {
      return <TriggerIconComponent />;
    }

    return null;
  }, [withNoTriggerIcon, TriggerIconComponent]);

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
