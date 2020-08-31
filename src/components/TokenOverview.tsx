import * as React from 'react';

import { TokenGroup } from '../interfaces/token-group.interface';
import { Token } from '../interfaces/token.interface';
import { TokenPresenter } from './presenter/TokenPresenter';
import { Card } from './primitives/Card';
import { Collapsible } from './primitives/Collapsible';
import { Input } from './primitives/Input';
import { Table } from './primitives/Table';
import { TokenName } from './primitives/TokenName';
import { parseVariables } from '../parsers/variables.parser';

interface Props {
  onChange: (value: any) => any;
  tokenGroups: TokenGroup[];
  tokenGroup: TokenGroup;
  viewType: 'card' | 'table';
}

export const TokenOverview = (props: Props) => {
  const { tokenGroups, tokenGroup, viewType } = props;
  const [tokens, setTokens] = React.useState<Token[]>([]);

  React.useEffect(() => {
    if (tokenGroup) {
      setTokens(tokenGroup.tokens);
    }
  }, [tokenGroup]);

  const changeTokenValue = React.useMemo(
    () => (token: Token, value: string) => {
      setTokens(tokens.map(t => (t.key === token.key ? { ...t, value } : t)));

      const previewIframe: HTMLIFrameElement = document.querySelector(
        '#storybook-preview-iframe'
      );

      props.onChange({ key: token.key, value, resetting: false });

      previewIframe.contentWindow.document.documentElement.style.setProperty(
        token.key,
        parseVariables(value, tokenGroups, false)
      );
    },
    [tokens]
  );

  const resetTokenValue = React.useMemo(
    () => (token: Token) => {
      setTokens(
        tokenGroup.tokens.map(t =>
          t.key === token.key ? t : tokens.find(to => to.key === t.key)
        )
      );

      const previewIframe: HTMLIFrameElement = document.querySelector(
        '#storybook-preview-iframe'
      );

      props.onChange({ key: token.key, undefined, resetting: true });

      previewIframe.contentWindow.document.documentElement.style.setProperty(
        token.key,
        parseVariables(tokenGroup.tokens.find(t => t.key === token.key).value, tokenGroups)
      );
    },
    [tokens]
  );

  return (
    <>
      <Collapsible id={tokenGroup.label} title={tokenGroup.label}>
        {viewType === 'card' &&
          tokens.map(token => (
            <Card
              aliases={token.aliases && token.aliases.join(', ')}
              description={token.description}
              key={token.key}
              preview={
                tokenGroup.presenter && (
                  <TokenPresenter tokenGroups={tokenGroups} type={tokenGroup.presenter} token={token} />
                )
              }
              title={<TokenName token={token} />}
              value={
                !token.editable ? (
                  <>{token.value}</>
                ) : (
                  <Input
                    value={token.value}
                    onChange={value => changeTokenValue(token, value)}
                    onReset={() => resetTokenValue(token)}
                    showReset={
                      token.editable &&
                      tokenGroup.tokens.find(t => t.key === token.key).value !==
                        token.value
                    }
                  />
                )
              }
            ></Card>
          ))}

        {viewType === 'table' && (
          <Table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Aliases</th>
                <th>Value</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map(token => (
                <tr key={token.key}>
                  <td>
                    <TokenName token={token} />
                    <span>{token.description}</span>
                  </td>
                  <td>{token.aliases && token.aliases.join(', ')}</td>
                  <td>
                    {!token.editable ? (
                      <>{token.value}</>
                    ) : (
                      <Input
                        value={token.value}
                        onChange={value => changeTokenValue(token, value)}
                        onReset={() => resetTokenValue(token)}
                        showReset={
                          token.editable &&
                          tokenGroup.tokens.find(t => t.key === token.key).updated === true
                        }
                      />
                    )}
                  </td>
                  <td>
                    {tokenGroup.presenter && (
                      <TokenPresenter
                        type={tokenGroup.presenter}
                        tokenGroups={tokenGroups}
                        token={token}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Collapsible>
    </>
  );
};
