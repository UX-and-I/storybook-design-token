import React from 'react';

import { useParameter } from '@storybook/api';
import { ActionBar, ScrollArea, Tabs } from '@storybook/components';

import { useTokenTabs } from '../hooks/useTokenTabs';
import { Config } from '../types/config.types';
import { TokenTab } from './TokenTab';

export const Panel = () => {
  const config = useParameter<Config>('designToken');
  const { activeCategory, cardView, setActiveCategory, setCardView, styleInjections, tabs } = useTokenTabs(config);

  return (
    <>
      <style>{styleInjections}</style>

      <ScrollArea vertical horizontal>
        <Tabs actions={{ onSelect: id => setActiveCategory(id) }} selected={activeCategory}>
          {tabs.map(tab => {
            return (
              <div key={tab.label} id={tab.label} title={tab.label}>
                <TokenTab categories={tab.categories} viewType={cardView ? 'card' : 'table'} showSearch={config?.showSearch}/>
              </div>
            );
          })}
        </Tabs>
      </ScrollArea>

      <ActionBar
        key="actionbar"
        actionItems={[
          {
            onClick: () => {
              setCardView(!cardView);
            },
            title: cardView ? 'Table View' : 'Card View',
          },
        ]}
      />
    </>
  );
};
