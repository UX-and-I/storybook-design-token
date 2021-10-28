import React, { useMemo, useState } from 'react';

import { Icons, TooltipMessage, TooltipNote, WithTooltip } from '@storybook/components';
import { styled } from '@storybook/theming';

import { Category } from '../types/category.types';
import { Token } from '../types/token.types';
import { ClipboardButton } from './ClipboardButton';
import { TokenPreview } from './TokenPreview';
import { TokenValue } from './TokenValue';
import { ToolButton } from './ToolButton';

interface TokenCardsProps {
  categories: Category[];
  readonly?: boolean;
  showValueColumn?: boolean;
}

export const TokenCards = ({
  categories,
  readonly,
  showValueColumn = true
}: TokenCardsProps) => {
  const [tokenValueOverwrites, setTokenValueOverwrites] = useState<{
    [tokenName: string]: any;
  }>({});

  const Container = useMemo(
    () =>
      styled.div(() => ({
        display: 'grid',
        columnGap: 12,
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        rowGap: 12
      })),
    []
  );

  const Card = useMemo(
    () =>
      styled.div(({ theme }) => ({
        boxShadow:
          'rgb(0 0 0 / 10%) 0px 1px 3px 1px, rgb(0 0 0 / 7%) 0px 0px 0px 1px',
        borderRadius: 4,
        color: theme.color.defaultText,
        fontFamily: theme.typography.fonts.base,
        fontSize: theme.typography.size.s1,
        padding: 12,

        '> *:not(:last-child)': {
          marginBottom: 8
        }
      })),
    []
  );

  const tokens = useMemo(
    () =>
      categories.reduce(
        (tokens, category) => [...tokens, ...category.tokens],
        [] as Token[]
      ),
    [categories]
  );

  return (
    <Container>
      {tokens.map((token) => (
        <Card key={token.name}>
          {token.name}

          <WithTooltip
            hasChrome={false}
            tooltip={<TooltipNote note="Copy to clipboard" />}
          >
            <ClipboardButton
              button={
                <ToolButton>
                  <Icons icon="copy" />
                </ToolButton>
              }
              value={token.name}
            />
          </WithTooltip>

          {token.description && (
            <WithTooltip tooltip={<TooltipMessage desc={token.description} />}>
              <ToolButton>
                <Icons icon="info" />
              </ToolButton>
            </WithTooltip>
          )}

          {showValueColumn && (
            <TokenValue
              onValueChange={(newValue) => {
                setTokenValueOverwrites((tokenValueOverwrites) => ({
                  ...tokenValueOverwrites,
                  [token.name]:
                    newValue === token.rawValue ? undefined : newValue
                }));
              }}
              readonly={readonly}
              token={token}
            />
          )}

          <TokenPreview
            token={{
              ...token,
              value: tokenValueOverwrites[token.name] || token.value
            }}
          />
        </Card>
      ))}
    </Container>
  );
};
