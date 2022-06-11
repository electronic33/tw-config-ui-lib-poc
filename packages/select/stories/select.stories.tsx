import React, { useState } from 'react';
import { RadixSelect } from '../src';

export default {
  title: 'Select',
  component: RadixSelect,
};

export const Default = (): React.ReactNode => {
  const [value1, setValue2] = useState('');

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4 items-start">
        <RadixSelect value={value1} onChange={setValue2} placeholder="Select one of the options" />
      </div>
    </div>
  );
};
