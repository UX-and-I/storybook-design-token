import * as React from 'react';

import styled from '@emotion/styled';

import { TokenGroup } from '../interfaces/token-group.interface';
import { TokenPresenter } from './Presenter/TokenPresenter';

const Table = styled.table(() => ({
  marginBottom: '36px !important',
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
  fontSize: '0.9rem !important',
  fontWeight: 600,
  textTransform: 'uppercase'
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
  return (
    <>
      <Title id={tokenGroup.label}>{tokenGroup.label}</Title>
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
    </>
  );
};
