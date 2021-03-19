import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface FontFamilyPresenterProps {
  token: Token;
}

export const FontFamilyPresenter = ({ token }: FontFamilyPresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        fontFamily: token.value,
        width: '100%'
      })),
    [token]
  );

  return <Box>Lorem ipsum</Box>;
};
