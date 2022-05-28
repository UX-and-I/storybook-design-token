import React, { useContext, useMemo } from 'react';

import { DocsContext, DocsContextProps } from '@storybook/addon-docs';
import { styled } from '@storybook/theming';

import { useTokenTabs } from '../hooks/useTokenTabs';
import type { TokenViewType } from './TokenTab';
import { TokenTable } from './TokenTable';
import { TokenCards } from './TokenCards';
import { useTokenSearch } from '../hooks/useTokenSearch';
import { SearchField } from './SearchField';

export interface DesignTokenDocBlockProps {
  categoryName: string;
  maxHeight?: number;
  showValueColumn?: boolean;
  viewType: TokenViewType;
}

interface CompatDocsContextProps extends DocsContextProps {
  storyById?: (id: string) => any;
}

/**
 * Storybook 6.4 changed the DocsContextProps interface.
 * This is a compatibility method to get docs parameters across Storybook versions.
 */
function getMainStory(context: CompatDocsContextProps) {
  return typeof context.storyById === 'function'
    ? context.storyById(context.id!)
    : context;
}

export const DesignTokenDocBlock = ({
  categoryName,
  maxHeight = 600,
  showValueColumn = true,
  viewType = 'table',
}: DesignTokenDocBlockProps) => {
  const context = useContext(DocsContext);
  const story = getMainStory(context);
  const { tabs } = useTokenTabs(story.parameters.designToken);

  const tab = useMemo(() => tabs.find((t) => t.label === categoryName), [
    categoryName,
    tabs
  ]);

  const { searchText, setSearchText, categories } = useTokenSearch(tab?.categories ?? []);

  const Container = styled.div(() => ({
    margin: '25px 0 40px',

    '*': {
      boxSizing: 'border-box'
    }
  }));

  const Card = useMemo(
    () =>
      styled.div(() => ({
        boxShadow:
          'rgb(0 0 0 / 10%) 0px 1px 3px 1px, rgb(0 0 0 / 7%) 0px 0px 0px 1px',
        borderRadius: 4
      })),
    []
  );

  if (!tab) {
    return null;
  }

  return (
    <Container className="design-token-container">
      <SearchField value={searchText} onChange={setSearchText} />
      {viewType === 'table' && (
        <Card className="design-token-card">
          <TokenTable
            categories={categories}
            maxHeight={maxHeight}
            readonly
            showValueColumn={showValueColumn}
          />
        </Card>
      )}
      {viewType === 'card' && (
        <TokenCards
          categories={categories}
          padded={false}
          readonly
          showValueColumn={showValueColumn}
        />
      )}
    </Container>
  );
};
