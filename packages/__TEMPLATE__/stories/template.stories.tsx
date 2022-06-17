import React from 'react';
import { Template } from '../src';

export default {
  title: 'Template',
  component: Template,
};

export const Default = (): React.ReactNode => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4 items-start">
        <Template>Any</Template>
      </div>
    </div>
  );
};
