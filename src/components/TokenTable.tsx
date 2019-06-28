import * as React from 'react';

import styled from '@emotion/styled';
import useLocalStorage from '@illinois/react-use-local-storage';

import { TokenGroup } from '../interfaces/token-group.interface';
import { TokenPresenter } from './Presenter/TokenPresenter';
import { TokenName } from './TokenName';

const Section = styled.section(() => ({
  marginBottom: '16px'
}));

const Table = styled.table(() => ({
  borderCollapse: 'collapse',
  width: '100%',

  '& tr:first-of-type td': {
    paddingTop: '20px'
  },

  '& th': {
    borderBottom: '2px solid #aaa',
    padding: '12px 12px 8px',
    textAlign: 'left',

    '&:first-of-type': {
      paddingLeft: 0
    }
  },

  '& td': {
    padding: '12px',
    verticalAlign: 'top',

    '&:first-of-type': {
      paddingLeft: 0
    }
  }
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
  position: 'relative',
  fontFamily:
    '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  overflow: 'auto',
  maxWidth: '200px',
  width: '200px',
  whiteSpace: 'nowrap'
}));

const iconChevronRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const iconChevronDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface Props {
  tokenGroup: TokenGroup;
}

export const TokenTable = ({ tokenGroup }: Props) => {
  const [expanded, setExpanded] = useLocalStorage(
    `SB_DESIGN_TOKEN_EXPANSION:${tokenGroup.label}`,
    false
  );

  return (
    <>
      <Section>
        <Title id={tokenGroup.label} onClick={() => setExpanded(!expanded)}>
          {!expanded ? iconChevronRight : iconChevronDown} {tokenGroup.label}
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
              {tokenGroup.tokens.map(token => (
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
                  <ValueCell>{token.value}</ValueCell>
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
