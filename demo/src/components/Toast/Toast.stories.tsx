import React from 'react';

import { number, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PaddingDecorator } from '../../../.storybook/decorators';
import { ShButton } from '../Button/Button';
import { ShToastContext, ShToastProvider } from './ToastProvider';

const appearances = {
  info: 'info',
  success: 'success',
  warning: 'warning'
};

storiesOf('Components', module)
  .addDecorator(PaddingDecorator)
  .add('Toast', () => {
    const appearance = select('appearance', appearances, 'info');
    const duration = number('duration', 5000);
    const message = text('message', 'New node created.');

    return (
      <ShToastProvider>
        <ShToastContext.Consumer>
          {value => (
            <ShButton
              label="Add Toast"
              onClick={() => value.add(message, appearance, duration)}
            />
          )}
        </ShToastContext.Consumer>
      </ShToastProvider>
    );
  });
