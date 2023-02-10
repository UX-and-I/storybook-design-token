import { Meta, Story } from '@storybook/react';

import { ButtonProps, DtButton } from './Button';

export default {
  title: 'Components/Button',
  component: DtButton
} as Meta;

export const Button: Story<ButtonProps> = (args) => <DtButton {...args} />;

Button.args = {
  label: 'Button Label'
};

export const NoSearch: Story<ButtonProps> = (args) => <DtButton {...args} />;

NoSearch.args = {
  label: 'Addon without search'
};
NoSearch.parameters = {
  designToken: {
    showSearch: false
  }
};

export const CustomPageSize: Story<ButtonProps> = (args) => <DtButton {...args} />;

CustomPageSize.args = {
  label: 'Custom pageSize'
};
CustomPageSize.parameters = {
  designToken: {
    pageSize: 3,
  }
};

