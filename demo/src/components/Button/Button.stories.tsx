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
