import * as React from 'react';

import styled from '@emotion/styled';
import useLocalStorage from '@illinois/react-use-local-storage';

import { TokenGroup } from '../interfaces/token-group.interface';
import { TokenPresenter } from './Presenter/TokenPresenter';

const Card = styled.div(() => ({
  backgroundColor: '#fff',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  borderRadius: '4px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  marginBottom: '16px',
  padding: '10px'
}));

const Table = styled.table(() => ({
  marginBottom: '0 !important',
  width: '100%',

  '& th': {
    paddingTop: '12px !important',
    paddingBottom: '12px !important',
    backgroundColor: '#f8f8f8'
  },

  '& tr:nth-of-type(2n)': { backgroundColor: '#fff !important' }
}));

const Title = styled.h2(() => ({
  borderBottom: 'none !important',
  color: '#1ea7fd',
  cursor: 'pointer !important',
  marginBottom: '0 !important',
  fontSize: '0.9rem !important',
  fontWeight: 600,

  ':not(:last-child)': {
    marginBottom: '20px !important'
  }
}));

const TokenCell = styled.td(() => ({
  fontWeight: 'bold',
  whiteSpace: 'nowrap',

  '& > span': {
    display: 'block',
    fontSize: '12px',
    fontStyle: 'italic',
    fontWeight: 'normal'
  }
}));

const AliasesCell = styled.td(() => ({
  whiteSpace: 'nowrap',
  width: '200px'
}));

const ExampleCell = styled.td(() => ({
  height: '54px',
  width: '167px',
  maxWidth: '167px',
  overflow: 'auto'
}));

const ValueCell = styled.td(() => ({
  fontFamily:
    '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  overflow: 'auto',
  maxWidth: '200px',
  width: '200px',
  whiteSpace: 'nowrap'
}));

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
      <Card>
        <Title id={tokenGroup.label} onClick={() => setExpanded(!expanded)}>
          {!expanded ? '▶' : '▼'} {tokenGroup.label}
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
                    {token.key}
                    {token.description && <span>{token.description}</span>}
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
      </Card>
    </>
  );
};
