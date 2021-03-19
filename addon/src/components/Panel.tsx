import React, { useMemo } from 'react';

import { useParameter } from '@storybook/api';
import { ActionBar, ScrollArea, Tabs } from '@storybook/components';
import { styled } from '@storybook/theming';

import { useTokenTabs } from '../hooks/useTokenTabs';
import { Config } from '../types/config.types';
import { TokenCards } from './TokenCards';
import { TokenTable } from './TokenTable';

export const Panel = () => {
  const config = useParameter<Config>('designToken');

  const {
    activeCategory,
    cardView,
    setActiveCategory,
    setCardView,
    styleInjections,
    tabs
  } = useTokenTabs(config);

  const TokenContainer = useMemo(
    () =>
      styled.div(() => ({
        padding: 15
      })),
    []
  );

  return (
    <>
      <style>{styleInjections}</style>

      <ScrollArea vertical horizontal>
        <Tabs
          actions={{ onSelect: (id) => setActiveCategory(id) }}
          selected={activeCategory}
        >
          {tabs.map((tab) => (
            <div key={tab.label} id={tab.label} title={tab.label}>
              <TokenContainer>
                {cardView && <TokenCards categories={tab.categories} />}
                {!cardView && <TokenTable categories={tab.categories} />}
              </TokenContainer>
            </div>
          ))}
        </Tabs>
      </ScrollArea>

      <ActionBar
        key="actionbar"
        actionItems={[
          {
            onClick: () => {
              setCardView(!cardView);
            },
            title: cardView ? 'Table View' : 'Card View'
          }
        ]}
      />
    </>
  );
};
