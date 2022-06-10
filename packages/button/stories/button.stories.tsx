import React from 'react';
import { Button } from '../src';

export default {
  title: 'Button',
  component: Button,
};

export const Default = (): React.ReactNode => (
  <div className="flex space-x-4">
    <div className="flex flex-col space-y-4 items-start">
      <Button className="btn-size-xs btn-color-primary-filled">Button XS</Button>
      <Button className="btn-size-sm btn-color-primary-filled">Button SM</Button>
      <Button className="btn-size-md btn-color-primary-filled">Button MD</Button>
      <Button className="btn-size-lg btn-color-primary-filled">Button LG</Button>
      <Button className="btn-size-xl btn-color-primary-filled">Button XL</Button>
    </div>
    <div className="flex flex-col space-y-4 items-start">
      <Button className="btn-size-xs btn-color-primary-outlined">Button XS</Button>
      <Button className="btn-size-sm btn-color-primary-outlined">Button SM</Button>
      <Button className="btn-size-md btn-color-primary-outlined">Button MD</Button>
      <Button className="btn-size-lg btn-color-primary-outlined">Button LG</Button>
      <Button className="btn-size-xl btn-color-primary-outlined">Button XL</Button>
    </div>
    <div className="flex flex-col space-y-4 items-start">
      <Button className="btn-size-xs btn-color-neutral-filled">Button XS</Button>
      <Button className="btn-size-sm btn-color-neutral-filled">Button SM</Button>
      <Button className="btn-size-md btn-color-neutral-filled">Button MD</Button>
      <Button className="btn-size-lg btn-color-neutral-filled">Button LG</Button>
      <Button className="btn-size-xl btn-color-neutral-filled">Button XL</Button>
    </div>
    <div className="flex flex-col space-y-4 items-start">
      <Button className="btn-size-xs btn-color-neutral-outlined">Button XS</Button>
      <Button className="btn-size-sm btn-color-neutral-outlined">Button SM</Button>
      <Button className="btn-size-md btn-color-neutral-outlined">Button MD</Button>
      <Button className="btn-size-lg btn-color-neutral-outlined">Button LG</Button>
      <Button className="btn-size-xl btn-color-neutral-outlined">Button XL</Button>
    </div>
  </div>
);
