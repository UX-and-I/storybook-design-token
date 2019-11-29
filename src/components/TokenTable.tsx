import * as React from 'react';

import styled from '@emotion/styled';
import useLocalStorage from '@illinois/react-use-local-storage';

import { TokenGroup } from '../interfaces/token-group.interface';
import { Token } from '../interfaces/token.interface';
import { IconChevronDown, IconChevronRight, IconClose } from './Icons';
import { TokenPresenter } from './Presenter/TokenPresenter';
import { Table } from './Primitives/Table';
import { TokenName } from './TokenName';

const Section = styled.section(() => ({
  marginBottom: '16px'
}));

const Title = styled.h2(() => ({
  color: '#1ea7fd',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: 600,

  ':not(:last-child)': {
    marginBottom: '8px'
  },

  '& svg': {
    position: 'relative',
    top: '-1px',
    marginLeft: '-4px',
    verticalAlign: 'middle',
    width: '16px',
    height: '16px'
  }
}));

const TokenCell = styled.td(() => ({
  whiteSpace: 'nowrap'
}));

const AliasesCell = styled.td(() => ({
  whiteSpace: 'nowrap',
  width: '200px'
}));

const ExampleCell = styled.td(() => ({
  position: 'relative',
  height: '54px',
  width: '167px',
  maxWidth: '167px',
  overflow: 'auto'
}));

const ValueCell = styled.td(() => ({
  display: 'inline-block',
  position: 'relative',
  fontFamily:
    '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  overflow: 'auto',
  maxWidth: '200px',
  width: '200px',
  whiteSpace: 'nowrap',

  '& > input': {
    paddingTop: '6px',
    paddingRight: '24px',
    paddingBottom: '6px',
    paddingLeft: '6px',
    width: '100%'
  },

  '& > button': {
    position: 'absolute',
    right: '12px',
    bottom: '6px',
    width: '20px',
    height: '20px',
    backgroundColor: 'transparent',
    border: 'none',
    transform: 'translate3d(0, -50%, 0)',
    padding: 0,
    paddingRight: '4px',
    cursor: 'pointer',

    '& svg': {
      position: 'relative',
      top: '-1px',
      verticalAlign: 'middle',
      width: '16px',
      height: '16px'
    }
  }
}));

interface Props {
  tokenGroup: TokenGroup;
}

export const TokenTable = ({ tokenGroup }: Props) => {
  const [expanded, setExpanded] = useLocalStorage(
    `SB_DESIGN_TOKEN_EXPANSION:${tokenGroup.label}`,
    false
  );

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

      previewIframe.contentWindow.document.documentElement.style.setProperty(
        token.key,
        value
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

      previewIframe.contentWindow.document.documentElement.style.setProperty(
        token.key,
        tokenGroup.tokens.find(t => t.key === token.key).value
      );
    },
    [tokens]
  );

  return (
    <>
      <Section>
        <Title id={tokenGroup.label} onClick={() => setExpanded(!expanded)}>
          {!expanded ? IconChevronRight : IconChevronDown} {tokenGroup.label}
        </Title>
        {expanded && (
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
                  <TokenCell>
                    <TokenName token={token} />
                  </TokenCell>
                  <AliasesCell>
                    {token.aliases &&
                      token.aliases.map((alias, index) =>
                        index === 0 ? alias : `, ${alias}`
                      )}
                  </AliasesCell>
                  <ValueCell>
                    {!token.editable && token.value}
                    {token.editable && (
                      <input
                        onChange={event =>
                          changeTokenValue(token, event.target.value)
                        }
                        type="text"
                        value={token.value}
                      />
                    )}
                    {token.editable &&
                      tokenGroup.tokens.find(t => t.key === token.key).value !==
                        token.value && (
                        <button
                          onClick={() => resetTokenValue(token)}
                          type="button"
                        >
                          {IconClose}
                        </button>
                      )}
                  </ValueCell>
                  <ExampleCell>
                    <TokenPresenter type={tokenGroup.presenter} token={token} />
                  </ExampleCell>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Section>
    </>
  );
};
