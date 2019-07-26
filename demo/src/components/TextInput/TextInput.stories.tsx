import React from 'react';

import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShTextInput } from './TextInput';

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('TextInput', () => {
    const disabled = boolean('disabled', false);
    const placeholder = text('placeholder', 'Placeholder …');
    const rows = number('rows', 1);
    const type = text('type', 'text');

    return (
      <ShTextInput
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        type={type}
      />
    );
  });
