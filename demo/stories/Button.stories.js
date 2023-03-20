import { createButton } from './Button';

export default {
  title: 'Button',
  render: ({ label, ...args }) => {
    return createButton({ label, ...args });
  },
  argTypes: {
    label: { control: 'text' }
  }
};

export const Button = {
  args: {
    label: 'Button'
  }
};
