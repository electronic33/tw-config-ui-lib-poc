import React from 'react';
import { Spinner } from '../src';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Template',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

export const Default: ComponentStory<typeof Spinner> = () => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4 items-start">
        <Spinner className="loading-indicator-size-md" />
        <Spinner className="loading-indicator-size-lg" />
      </div>
    </div>
  );
};
