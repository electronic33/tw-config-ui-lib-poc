import React, { useState } from 'react';
import { HeadlessUiSelect, RadixSelect, TriggerComponentType } from '../src';

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

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4 items-start">
        <RadixSelect
          value={value2}
          onChange={setValue2}
          placeholder="Select one of the options"
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
    </div>
  );
};
