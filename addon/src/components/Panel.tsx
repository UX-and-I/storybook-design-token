import React, { useEffect } from 'react';

import { useParameter } from '@storybook/api';
import { ActionBar, ScrollArea, Tabs } from '@storybook/components';

import { useTokenTabs } from '../hooks/useTokenTabs';
import { Config } from '../types/config.types';
import { TokenTab } from './TokenTab';
import { registerPresenter } from './TokenPreview';

export const Panel = () => {
  const config = useParameter<Config>('designToken');
  console.dir(config);
  const {
    activeCategory,
    cardView,
    setActiveCategory,
    setCardView,
    styleInjections,
    tabs
  } = useTokenTabs(config);

  // useEffect(() => {
  //   if (config?.getCustomPresenters()) {
  //     for (const presenterName in config.getCustomPresenters()) {
  //       const PresenterComponent = config.getCustomPresenters()[presenterName];
  //       registerPresenter(presenterName, PresenterComponent)
  //     }
  //   }

  // }, [config?.getCustomPresenters()]);

  const ImagePresenter = config?.presenters?.['Image'];
  
  return (
    <>
      <style>{styleInjections}</style>

      {/* ERROR Will happen here */}
      {ImagePresenter && <ImagePresenter token={{} as any}/>}

      <ScrollArea vertical horizontal>
        <Tabs
          actions={{ onSelect: (id) => setActiveCategory(id) }}
          selected={activeCategory}
        >
          {tabs.map((tab) => {
            return (
              <div key={tab.label} id={tab.label} title={tab.label}>
                {activeCategory === tab.label && (
                  <TokenTab
                    categories={tab.categories}
                    viewType={cardView ? 'card' : 'table'}
                    showSearch={config?.showSearch}
                    pageSize={config?.pageSize}
                    presenters={{}}
                  />
                )}
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
            title: cardView ? 'Table View' : 'Card View'
          }
        ]}
      />
    </>
  );
};
