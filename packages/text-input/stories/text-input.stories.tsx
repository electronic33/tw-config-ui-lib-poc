import React from 'react';
import { TextInput } from '../src';

export default {
  title: 'Text Input',
  component: TextInput,
};

export const Default = (): React.ReactNode => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4 items-start">
        <TextInput />
      </div>
    </div>
  );
};
