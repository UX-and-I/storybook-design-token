import React from 'react';

import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShSpinner } from './Spinner';

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('Spinner', () => {
    return <ShSpinner />;
  });
