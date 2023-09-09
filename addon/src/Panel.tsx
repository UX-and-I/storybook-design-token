import { ActionBar, AddonPanel, ScrollArea, Tabs } from "@storybook/components";
import { useParameter } from "@storybook/manager-api";
import React from "react";
import { TokenTab } from "./components/TokenTab";
import { useTokenTabs } from "./hooks/useTokenTabs";
import { Config } from "./types/config.types";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const config = useParameter<Config>("designToken");

  const {
    activeCategory,
    cardView,
    setActiveCategory,
    setCardView,
    styleInjections,
    tabs,
  } = useTokenTabs(config);

  return (
    <AddonPanel {...props}>
      <>
        <style>{styleInjections}</style>

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
                      viewType={cardView ? "card" : "table"}
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
              title: cardView ? "Table View" : "Card View",
            },
          ]}
        />
      </>
    </AddonPanel>
  );
};
