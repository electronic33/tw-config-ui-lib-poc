import React, { useState } from 'react';
import { ButtonPropsWeControl, HeadlessUiSelect, RadixSelect } from '../src';

export default {
  title: 'Select',
  component: RadixSelect,
};

const TestComp = ({
  anyProps,
  importantProps,
  children,
}: {
  importantProps: Record<ButtonPropsWeControl, any>;
  anyProps: any;
  children?: React.ReactNode;
}) => {
  console.log('🚀 ~ file: select.tsx ~ line 118 ~ TestComp ~ props', importantProps, anyProps);
  return <button {...importantProps}>Plus child {children}</button>;
};

export const Default = (): React.ReactNode => {
  const [value1, setValue2] = useState({ id: '1', name: 'name 1' });

  return (
    <div className="flex space-x-4">
      {/* <div className="flex flex-col space-y-4 items-start">
        <RadixSelect value={value1} onChange={setValue2} placeholder="Select one of the options" />
      </div> */}
      <div className="flex flex-col space-y-4 items-start">
        <HeadlessUiSelect
          value={value1}
          onChange={setValue2}
          placeholder="Select one of the options"
          getTriggerValue={(value) => value?.name || ''}
          options={[]}
          TriggerComponent={TestComp}
        />
      </div>
    </div>
  );
};
