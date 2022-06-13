import React, { useState } from 'react';
import { HeadlessUiSelect, RadixSelect, TriggerComponentType } from '../src';

export default {
  title: 'Select',
  component: RadixSelect,
};

type CustomTriggerComponentExtraProps = {
  isEditing: boolean;
};

const CustomTriggerComponent: TriggerComponentType<CustomTriggerComponentExtraProps> = ({
  extraProps,
  requiredProps,
}) => {
  return (
    <button {...requiredProps}>
      Plus child {requiredProps.children} {extraProps.isEditing ? 'Editing' : 'Not Editing'}
    </button>
  );
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
          TriggerComponent={CustomTriggerComponent}
          triggerComponentExtraProps={{ isEditing: true }}
        />
      </div>
    </div>
  );
};
