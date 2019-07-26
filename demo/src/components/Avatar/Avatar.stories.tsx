import React from 'react';

import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShAvatar } from './Avatar';

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('Avatar', () => {
    const image = text(
      'image',
      'https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg'
    );
    const name = text('name', 'Philipp Siekmann');

    return <ShAvatar name={name} image={image} />;
  });
