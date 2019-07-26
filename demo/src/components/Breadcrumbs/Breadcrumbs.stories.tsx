import React from 'react';

import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShBreadcrumbs } from './Breadcrumbs';

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('Breadcrumbs', () => {
    const links = [
      {
        title: 'Content Graph',
        url: '#'
      },
      {
        title: 'Blog Posts',
        url: '#'
      },
      {
        title: 'Chat Bot Prototyping with Ink and React',
        url: '#'
      }
    ];
    return <ShBreadcrumbs links={links} />;
  });
