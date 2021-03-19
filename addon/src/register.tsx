import React from 'react';

import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';

import { Panel } from './components/Panel';

const ADDON_ID = 'storybook-design-token';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Design Tokens',
    render: ({ active = false, key }) => (
      <AddonPanel active={active} key={key}>
        <Panel />
      </AddonPanel>
    )
  });
});
