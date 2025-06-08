import { ActionBar, AddonPanel, ScrollArea, Tabs } from "storybook/internal/components";
import { useParameter } from "storybook/manager-api";
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

  // React shows a warning in the console when the count of tabs is changed because identifiers of tabs are used in the dependency array of the useMemo hook. 
  // To prevent this, we fully re-render the Tabs control by providing a new key when tabs are changed.
  // https://github.com/storybookjs/storybook/blob/176017d03224f8d0b4add227ebf29a3705f994f5/code/ui/components/src/components/tabs/tabs.tsx#L151
  const key = (tabs ?? []).map(item => item.label).join('-');

  return (
    <AddonPanel {...props}>
      <>
        <style>{styleInjections}</style>

        <ScrollArea vertical horizontal>
          <Tabs
            key={key}
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
