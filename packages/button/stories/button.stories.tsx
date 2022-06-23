import { ComponentMeta, ComponentStory } from '@storybook/react';
import clsx from 'clsx';
import React from 'react';
import { FaAirbnb } from 'react-icons/fa';
import { Button, buttonClasses, ButtonWithConfirmation } from '../src';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = () => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4 items-start">
        <Button className="button-size-xs button-color-primary-filled">Button XS</Button>
        <Button className="button-size-sm button-color-primary-filled">Button SM</Button>
        <Button className="button-size-md button-color-primary-filled">
          <FaAirbnb className="button-icon-left-md" />
          Button MD
        </Button>
        <Button className="button-size-md button-color-primary-filled w-56">
          <FaAirbnb className="button-icon-left-md button-icon-left-md-offset-to-center" />
          Button MD
        </Button>
        <Button className="button-size-md button-color-primary-filled">
          Button MD
          <FaAirbnb className="button-icon-right-md" />
        </Button>
        <Button className="button-size-md button-color-primary-filled w-56">
          Button MD
          <FaAirbnb className="button-icon-right-md button-icon-right-md-offset-to-center" />
        </Button>
        <Button className="button-size-lg button-color-primary-filled" disabled>
          Button LG
        </Button>
        <Button className="button-size-xl button-color-primary-filled">Button XL</Button>
      </div>
      <div className="flex flex-col space-y-4 items-start">
        <Button className="button-size-xs button-color-primary-outlined">Button XS</Button>
        <Button className="button-size-sm button-color-primary-outlined">Button SM</Button>
        <Button className="button-size-md button-color-primary-outlined">Button MD</Button>
        <Button className="button-size-lg button-color-primary-outlined">Button LG</Button>
        <Button className="button-size-xl button-color-primary-outlined">Button XL</Button>
      </div>
      <div className="flex flex-col space-y-4 items-start">
        <Button className="button-size-xs button-color-neutral-filled">Button XS</Button>
        <Button className="button-size-sm button-color-neutral-filled">Button SM</Button>
        <Button className="button-size-md button-color-neutral-filled">Button MD</Button>
        <Button className="button-size-lg button-color-neutral-filled">Button LG</Button>
        <Button className="button-size-xl button-color-neutral-filled">Button XL</Button>
      </div>
      <div className="flex flex-col space-y-4 items-start">
        <Button className="button-size-xs button-color-neutral-outlined">Button XS</Button>
        <Button className="button-size-sm button-color-neutral-outlined">Button SM</Button>
        <Button className="button-size-md button-color-neutral-outlined">Button MD</Button>
        <Button className="button-size-lg button-color-neutral-outlined">Button LG</Button>
        <Button className="button-size-xl button-color-neutral-outlined">Button XL</Button>
      </div>
    </div>
  );
};

export const Confirmation: ComponentStory<typeof ButtonWithConfirmation> = () => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4 items-start">
        <ButtonWithConfirmation
          confirmationDialogTitle="Confirmation required"
          confirmationDialogDescription={
            <>
              Deleting user with email <b>email@gmail.test</b> is an irreverisble action. You will
              not be able to restore it.
            </>
          }
          className={clsx(buttonClasses.colorPrimaryFilled, buttonClasses.sizeMd)}
        >
          Delete
        </ButtonWithConfirmation>
      </div>
    </div>
  );
};
