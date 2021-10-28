import React, { useContext, useMemo } from 'react';

import { DocsContext, DocsContextProps } from '@storybook/addon-docs';
import { styled } from '@storybook/theming';

import { useTokenTabs } from '../hooks/useTokenTabs';
import { TokenCards } from './TokenCards';
import { TokenTable } from './TokenTable';

export interface DesignTokenDocBlockProps {
  categoryName: string;
  viewType?: 'card' | 'table';
  showValueColumn?: boolean;
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
  viewType = 'table',
  showValueColumn = true,
}: DesignTokenDocBlockProps) => {
  const context = useContext(DocsContext);
  const story = getMainStory(context);
  const { tabs } = useTokenTabs(story.parameters.designToken);

  const tab = useMemo(() => tabs.find((t) => t.label === categoryName), [
    categoryName,
    tabs
  ]);

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
        borderRadius: 4,
        padding: 20
      })),
    []
  );

  if (!tab) {
    return null;
  }

  return (
    <Container className="design-token-container">
      {viewType === 'table' && (
        <Card className="design-token-card">
          <TokenTable categories={tab.categories} readonly showValueColumn={showValueColumn} />
        </Card>
      )}
      {viewType === 'card' && (
        <TokenCards categories={tab.categories} readonly showValueColumn={showValueColumn} />
      )}
    </Container>
  );
};
