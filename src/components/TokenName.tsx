import * as React from 'react';
import useClipboard from 'react-use-clipboard';

import styled from '@emotion/styled';

import { Token } from '../interfaces/token.interface';

const Name = styled.span(() => ({
  cursor: 'pointer',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',

  '&:hover': {
    '& > .copy-notice': {
      opacity: 1
    }
  },

  '& > span': {
    display: 'block',
    marginTop: '4px',
    color: '#666',
    fontSize: '12px',
    fontWeight: 'normal',
    whiteSpace: 'normal'
  },

  '& > .copy-notice': {
    color: '#1ea7fd',
    display: 'inline-block',
    marginLeft: '4px',
    opacity: 0
  }
}));

interface Props {
  token: Token;
}

export const TokenName = ({ token }: Props) => {
  const [showCopiedLabel, setShowCopiedLabel] = React.useState(false);
  const [isCopied, setCopied] = useClipboard(token.key);

  React.useEffect(() => {
    let timer;

    if (showCopiedLabel) {
      timer = setTimeout(() => {
        setShowCopiedLabel(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showCopiedLabel]);

  return (
    <Name
      onClick={() => {
        setCopied();
        setShowCopiedLabel(true);
      }}
    >
      {token.key}{' '}
      <span className="copy-notice">
        {showCopiedLabel ? 'Copied!' : 'Click to copy'}
      </span>
      {token.description && <span>{token.description}</span>}
    </Name>
  );
};
