import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface FontWeightPresenterProps {
  token: Token;
}

export const FontWeightPresenter = ({ token }: FontWeightPresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        fontWeight: token.value as 'bold' | 'normal' | number,
        width: '100%'
      })),
    [token]
  );

  return <Box>Lorem ipsum</Box>;
};
