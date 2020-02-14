import * as React from 'react';
import useClipboard from 'react-use-clipboard';

import { styled } from '@storybook/theming';

import { Token } from '../../interfaces/token.interface';

interface Props {
  token: Token;
}

const Container = styled.div(() => ({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',

  '& > span': {
    fontSize: '10px',
    fontWeight: 400,
    paddingLeft: '8px',
    whiteSpace: 'nowrap'
  }
}));

const Name = styled.div(() => ({
  flexGrow: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}));

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
    <Container
      onClick={() => {
        setCopied();
        setShowCopiedLabel(true);
      }}
    >
      <Name>{token.key}</Name>
      <span className="copy-notice">
        {showCopiedLabel ? 'Copied!' : 'Click to copy'}
      </span>
    </Container>
  );
};
