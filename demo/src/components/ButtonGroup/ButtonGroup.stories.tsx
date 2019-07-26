import React from 'react';

import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShButton } from '../Button/Button';
import { ShButtonGroup } from './ButtonGroup';

const spacings = {
  xs: 'xs',
  s: 's',
  m: 'm'
};

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('ButtonGroup', () => {
    const spacing = select('spacing', spacings, 'm');

    return (
      <ShButtonGroup spacing={spacing}>
        <ShButton label="Button #1" />
        <ShButton label="Button #2" appearance="primary" />
        <ShButton label="Button #3" />
      </ShButtonGroup>
    );
  });
