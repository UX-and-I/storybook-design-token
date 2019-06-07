import * as React from 'react';

import styled from '@emotion/styled';

import { TokenGroup } from '../interfaces/token-group.interface';

const Navigation = styled.ul(() => ({
  listStyle: 'none',
  marginBottom: '30px !important',
  paddingLeft: '0 !important',

  '& > li': {
    display: 'inline-block',
    fontSize: '0.9rem !important',
    fontWeight: 600,
    margin: '0 8px 8px 0'
  },

  '& a': {
    display: 'inline-block',
    borderRadius: '3px',
    backgroundColor: '#1ea7fd',
    color: '#fff',
    padding: '2px 8px 3px'
  }
}));

interface Props {
  tokenGroups: TokenGroup[];
}

export const TokenNavigation = ({ tokenGroups }: Props) => {
  return (
    <>
      <Navigation>
        {tokenGroups.map((tokenGroup, index) => (
          <li key={index}>
            <a href={`#${tokenGroup.label}`}>{tokenGroup.label}</a>
          </li>
        ))}
      </Navigation>
    </>
  );
};
