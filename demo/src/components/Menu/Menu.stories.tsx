import React from 'react';

import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShMenuItem } from '../MenuItem/MenuItem';
import { ShMenu } from './Menu';

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('Menu', () => {
    return (
      <ShMenu>
        <ShMenuItem icon="home" label="Home" />
        <ShMenuItem icon="folder" label="Assets" />
        <ShMenuItem icon="settings" label="Settings" />
      </ShMenu>
    );
  });
