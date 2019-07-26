import React from 'react';

import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShCollapsible } from './Collapsible';

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('Collapsible', () => {
    const title = text('title', 'Collapsible');

    return (
      <ShCollapsible startCollapsed={false} title={title}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eveniet
        commodi, quasi quae sunt excepturi aut atque, voluptas debitis dolorum
        beatae ducimus quidem dolores. Molestias exercitationem incidunt enim
        natus quis.
      </ShCollapsible>
    );
  });
