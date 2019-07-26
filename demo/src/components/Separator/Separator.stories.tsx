import React from 'react';

import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShSeparator } from './Separator';

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('Separator', () => {
    const label = text('label', 'or');

    return <ShSeparator label={label} />;
  });
