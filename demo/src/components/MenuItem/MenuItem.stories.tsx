import React from 'react';

import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShMenuItem } from './MenuItem';

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('MenuItem', () => {
    const disabled = boolean('disabled', false);
    const icon = text('icon', 'home');
    const label = text('label', 'Menu Item Label');

    return <ShMenuItem disabled={disabled} icon={icon} label={label} />;
  });
