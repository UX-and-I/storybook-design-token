import { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface FontSizePresenterProps {
  token: Token;
}

export const FontSizePresenter = ({ token }: FontSizePresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        fontSize: token.value,
        height: token.value,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        width: '100%'
      })),
    [token]
  );

  return <Box>Lorem ipsum</Box>;
};
