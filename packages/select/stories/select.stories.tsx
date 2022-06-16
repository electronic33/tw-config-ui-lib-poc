import * as Select from '@radix-ui/react-select';
import React, { useState } from 'react';
import { HeadlessUiSelect, RadixSelect, TriggerComponentType } from '../src';
import { ContentComponent } from '../src/default-components/content';

export default {
  title: 'Select',
  component: RadixSelect,
};

type CustomTriggerComponentExtraProps = {
  isEditing: boolean;
};

const CustomTriggerComponent: TriggerComponentType<
  CustomTriggerComponentExtraProps,
  { id: string; name: string }
> = ({ extraProps, requiredProps, internalProps }) => {
  // console.log('🚀 ~ file: select.stories.tsx ~ line 18 ~ internalProps', internalProps);
  return (
    <button {...requiredProps}>
      Plus child {requiredProps.children} {extraProps?.isEditing ? 'Editing' : 'Not Editing'}
    </button>
  );
};

const RadixTestComponent = (props1) => {
  console.log('🚀 ~ file: select.stories.tsx ~ line 27 ~ RadixTestComponent ~ props', props1);

  return <span {...props1}>asd</span>;
};

const RadixTestComponent2 = (props2) => {
  console.log('🚀 ~ file: select.stories.tsx ~ line 32 ~ RadixTestComponent2 ~ props', props2);

  return <span {...props2}>bla</span>;
};

const RadixTestComponent3 = (props3) => {
  console.log('🚀 ~ file: select.stories.tsx ~ line 38 ~ RadixTestComponent3 ~ props3', props3);

  return <span {...props3}>{props3.children}</span>;
};

export const Default = (): React.ReactNode => {
  const [value1, setValue1] = useState({ id: '1', name: 'name 1' });
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('item-1');

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4 items-start">
        <RadixSelect
          value={value2}
          onChange={setValue2}
          placeholder="Select one of the options"
          options={[]}
          // componentExtraProps={{
          //   icon: {
          //     className: 'w-5 h-5 text-red-500',
          //   },
          // }}
          // renderIcon={(renderProps) => <RadixTestComponent {...renderProps} />}
          // components={{
          //   TriggerValue: RadixTestComponent,
          //   TriggerIcon: RadixTestComponent2,
          //   Trigger: RadixTestComponent3,
          // }}
        />
      </div>
      {/* <div className="flex flex-col space-y-4 items-start">
        <HeadlessUiSelect
          value={value1}
          onChange={setValue1}
          placeholder="Select one of the options"
          getTriggerValue={(value) => value?.name || ''}
          options={[]}
          TriggerComponent={CustomTriggerComponent}
          triggerComponentExtraProps={{ isEditing: true }}
        />
      </div> */}
      <Select.Root value={value3} onValueChange={setValue3}>
        <Select.Trigger>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Content className="p-2 bg-red-400" asChild>
          <ContentComponent>
            <Select.ScrollUpButton />
            <Select.Viewport className="p-4 bg-green-200">
              <Select.Item value="item-1">
                <Select.ItemText>Item 1 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-2">
                <Select.ItemText>Item 2 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-3">
                <Select.ItemText>Item 3 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-4">
                <Select.ItemText>Item 4 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-5">
                <Select.ItemText>Item 5 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-6">
                <Select.ItemText>Item 6 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-7">
                <Select.ItemText>Item 7 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-8">
                <Select.ItemText>Item 8 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-9">
                <Select.ItemText>Item 9 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-10">
                <Select.ItemText>Item 10 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-11">
                <Select.ItemText>Item 11 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="item-12">
                <Select.ItemText>Item 12 text</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Group>
                <Select.Label>Group 1</Select.Label>
                <Select.Item value="item-13">
                  <Select.ItemText>Item 13 text</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              </Select.Group>

              <Select.Separator />
            </Select.Viewport>
            <Select.ScrollDownButton />
          </ContentComponent>
        </Select.Content>
      </Select.Root>
    </div>
  );
};
