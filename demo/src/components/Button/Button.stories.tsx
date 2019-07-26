import React from 'react';

import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShButton } from './Button';

const appearances = {
  default: 'default',
  link: 'link',
  'primary-link': 'primary-link',
  primary: 'primary'
};

const sizes = {
  m: 'm',
  l: 'l',
  xl: 'xl'
};

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('Button', () => {
    const appearance = select('appearance', appearances, 'default');
    const disabled = boolean('disabled', false);
    const iconLeft = text('iconLeft', '');
    const iconRight = text('iconRight', '');
    const label = text('label', 'Button Label');
    const size = select('size', sizes, 'm');
    const square = boolean('square', false);
    const stretch = boolean('stretch', false);
    const title = text('title', '');

    return (
      <ShButton
        appearance={appearance}
        disabled={disabled}
        iconLeft={iconLeft}
        iconRight={iconRight}
        label={label}
        size={size}
        square={square}
        stretch={stretch}
        title={title}
      />
    );
  });
