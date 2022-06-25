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
        <Button className={clsx(buttonClasses.sizeXs, buttonClasses.colorPrimaryFilled)}>
          Button XS
        </Button>
        <Button className={clsx(buttonClasses.sizeSm, buttonClasses.colorPrimaryFilled)}>
          Button SM
        </Button>
        <Button className={clsx(buttonClasses.sizeMd, buttonClasses.colorPrimaryFilled)}>
          <FaAirbnb className={clsx(buttonClasses.leftIconMd)} />
          Button MD
        </Button>
        <Button className={clsx(buttonClasses.sizeMd, buttonClasses.colorPrimaryFilled, 'w-56')}>
          <FaAirbnb
            className={clsx(buttonClasses.leftIconMd, buttonClasses.leftIconMdOffsetToCenter)}
          />
          Button MD
        </Button>
        <Button className={clsx(buttonClasses.sizeMd, buttonClasses.colorPrimaryFilled)}>
          Button MD
          <FaAirbnb className={clsx(buttonClasses.rightIconMd)} />
        </Button>
        <Button className={clsx(buttonClasses.sizeMd, buttonClasses.colorPrimaryFilled, 'w-56')}>
          Button MD
          <FaAirbnb
            className={clsx(buttonClasses.rightIconMd, buttonClasses.rightIconMdOffsetToCenter)}
          />
        </Button>
        <Button className={clsx(buttonClasses.sizeLg, buttonClasses.colorPrimaryFilled)} disabled>
          Button LG
        </Button>
        <Button className={clsx(buttonClasses.sizeXl, buttonClasses.colorPrimaryFilled)}>
          Button XL
        </Button>
      </div>
      <div className="flex flex-col space-y-4 items-start">
        <Button className={clsx(buttonClasses.sizeXs, buttonClasses.colorPrimaryOutlined)}>
          Button XS
        </Button>
        <Button className={clsx(buttonClasses.sizeSm, buttonClasses.colorPrimaryOutlined)}>
          Button SM
        </Button>
        <Button className={clsx(buttonClasses.sizeMd, buttonClasses.colorPrimaryOutlined)}>
          Button MD
        </Button>
        <Button className={clsx(buttonClasses.sizeLg, buttonClasses.colorPrimaryOutlined)}>
          Button LG
        </Button>
        <Button className={clsx(buttonClasses.sizeXl, buttonClasses.colorPrimaryOutlined)}>
          Button XL
        </Button>
      </div>
      <div className="flex flex-col space-y-4 items-start">
        <Button className={clsx(buttonClasses.sizeXs, buttonClasses.colorNeutralFilled)}>
          Button XS
        </Button>
        <Button className={clsx(buttonClasses.sizeSm, buttonClasses.colorNeutralFilled)}>
          Button SM
        </Button>
        <Button className={clsx(buttonClasses.sizeMd, buttonClasses.colorNeutralFilled)}>
          Button MD
        </Button>
        <Button className={clsx(buttonClasses.sizeLg, buttonClasses.colorNeutralFilled)}>
          Button LG
        </Button>
        <Button className={clsx(buttonClasses.sizeXl, buttonClasses.colorNeutralFilled)}>
          Button XL
        </Button>
      </div>
      <div className="flex flex-col space-y-4 items-start">
        <Button className={clsx(buttonClasses.sizeXs, buttonClasses.colorNeutralOutlined)}>
          Button XS
        </Button>
        <Button className={clsx(buttonClasses.sizeSm, buttonClasses.colorNeutralOutlined)}>
          Button SM
        </Button>
        <Button className={clsx(buttonClasses.sizeMd, buttonClasses.colorNeutralOutlined)}>
          Button MD
        </Button>
        <Button className={clsx(buttonClasses.sizeLg, buttonClasses.colorNeutralOutlined)}>
          Button LG
        </Button>
        <Button className={clsx(buttonClasses.sizeXl, buttonClasses.colorNeutralOutlined)}>
          Button XL
        </Button>
      </div>
    </div>
  );
};

type TestProps = {
  key1: string;
  key2: number;
};

const Test = (props: TestProps) => <div>asd</div>;

export const Confirmation: ComponentStory<typeof ButtonWithConfirmation> = () => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-4 items-start">
        <ButtonWithConfirmation
          // TODO: have this complain if Test has any required props

          // confirmationDialogProps={{
          //   // dialogTitle: 'Confirmation required',
          //   // dialogDescription: (
          //   //   <>
          //   //     Deleting user with email <b>email@gmail.test</b> is an irreverisble action. You will
          //   //     not be able to restore it.
          //   //   </>
          //   // ),
          //   key1: '1',
          // }}
          // ConfirmationDialogComponent={Test}
          // confirmationDialogProps={{
          //   dialogTitle: 'asd',
          // }}
          ConfirmationDialogComponent={Test}
          className={clsx(buttonClasses.colorPrimaryFilled, buttonClasses.sizeMd)}
        >
          Delete
        </ButtonWithConfirmation>
      </div>
    </div>
  );
};
