import { transparentize } from 'polished';
import React, { useMemo, useState } from 'react';

import { Icons, TooltipMessage, TooltipNote, WithTooltip } from '@storybook/components';
import { styled } from '@storybook/theming';

import { Category } from '../types/category.types';
import { Token } from '../types/token.types';
import { ClipboardButton } from './ClipboardButton';
import { TokenPreview } from './TokenPreview';
import { TokenValue } from './TokenValue';
import { ToolButton } from './ToolButton';

interface TokenTableProps {
  categories: Category[];
  readonly?: boolean;
  showValueColumn?: boolean;
}

export const TokenTable = ({
  categories,
  readonly,
  showValueColumn = true
}: TokenTableProps) => {
  const [tokenValueOverwrites, setTokenValueOverwrites] = useState<{
    [tokenName: string]: any;
  }>({});

  const Table = useMemo(
    () =>
      styled.table(({ theme }) => ({
        borderCollapse: 'collapse',
        borderSpacing: 0,
        color: theme.color.defaultText,
        fontFamily: theme.typography.fonts.base,
        fontSize: theme.typography.size.s1,
        minWidth: 700,
        tableLayout: 'fixed',
        textAlign: 'left',
        width: '100%',

        'tbody > tr': {
          borderTop: `1px solid ${theme.color.mediumlight}`,

          ':first-of-type': {
            borderTopColor: theme.color.medium
          },

          ':last-of-type': {
            borderBottom: `1px solid ${theme.color.mediumlight}`
          }
        },

        'td, th': {
          border: 'none',
          textOverflow: 'ellipsis',
          verticalAlign: 'middle',

          ':nth-of-type(2)': {
            width: 300
          },

          ':nth-of-type(3)': {
            width: 200
          }
        },

        th: {
          color:
            theme.base === 'light'
              ? transparentize(0.25, theme.color.defaultText)
              : transparentize(0.45, theme.color.defaultText),
          paddingBottom: 12,

          ':not(:first-of-type)': {
            paddingLeft: 15
          },

          ':not(:last-of-type)': {
            paddingRight: 15
          },

          ':last-of-type': {
            width: 200
          }
        },

        td: {
          overflow: 'hidden',
          paddingBottom: 8,
          paddingTop: 8,

          ':not(:first-of-type)': {
            paddingLeft: 15
          },

          ':not(:last-of-type)': {
            paddingRight: 15
          }
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
    <Table>
      <thead className="docblock-argstable-head">
        <tr>
          <th>Name</th>
          {showValueColumn && <th>Value</th>}
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <tr key={token.name}>
            <td>
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
                <WithTooltip
                  tooltip={<TooltipMessage desc={token.description} />}
                >
                  <ToolButton>
                    <Icons icon="info" />
                  </ToolButton>
                </WithTooltip>
              )}
            </td>
            {showValueColumn && (
              <td>
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
              </td>
            )}
            <td>
              <TokenPreview
                token={{
                  ...token,
                  value: tokenValueOverwrites[token.name] || token.value
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
