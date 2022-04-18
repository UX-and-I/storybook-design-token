import React from 'react';

import { useParameter } from '@storybook/api';
import { ActionBar, ScrollArea, Tabs, Form, Icons } from '@storybook/components';

import { useTokenTabs } from '../hooks/useTokenTabs';
import { Config } from '../types/config.types';
import { TokenCards } from './TokenCards';
import { TokenTable } from './TokenTable';
import { useState } from 'react';
import { Input } from './Input';
import { useDebounce } from '../hooks/useDebounce';

export const Panel = () => {
  const config = useParameter<Config>('designToken');
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 250);

  const { activeCategory, cardView, setActiveCategory, setCardView, styleInjections, tabs } = useTokenTabs(config);

  return (
    <>
      <style>{styleInjections}</style>

      <ScrollArea vertical horizontal>
        <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
        <Tabs actions={{ onSelect: id => setActiveCategory(id) }} selected={activeCategory}>
          {tabs.map(tab => {
            const categories = debouncedSearchText
              ? tab.categories.map(item => ({
                  ...item,
                  tokens: item.tokens.filter(token => token.name.includes(debouncedSearchText)),
                }))
              : tab.categories;

            return (
              <div key={tab.label} id={tab.label} title={tab.label}>
                <div>
                  {cardView && <TokenCards categories={categories} />}
                  {!cardView && <TokenTable categories={categories} />}
                </div>
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
