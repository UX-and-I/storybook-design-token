import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface BorderRadiusPresenterProps {
  token: Token;
}

export const BorderRadiusPresenter = ({
  token
}: BorderRadiusPresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(({ theme }) => ({
        background: theme.color.secondary,
        borderRadius: token.value,
        height: 32,
        minHeight: `calc(${token.value} * 2)`,
        minWidth: `calc(${token.value} * 2)`,
        width: '100%'
      })),
    [token]
  );

  return <Box></Box>;
};
