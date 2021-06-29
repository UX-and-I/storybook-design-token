import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface BorderRadiusPresenterProps {
  token: Token;
}

export const BorderRadiusPresenter = ({
  token
}: BorderRadiusPresenterProps) => {
  const Container = useMemo(
    () =>
      styled.div(() => ({
        maxHeight: 80,
        overflow: 'auto'
      })),
    []
  );

  const Box = useMemo(
    () =>
      styled.div(({ theme }) => ({
        background: theme.color.secondary,
        borderRadius: token.value,
        height: 32,
        width: '100%',
        minHeight: 16,
        minWidth: 16,
        maxHeight: 160,
        maxWidth: '100%',
        resize: 'both',
        overflow: 'hidden'
      })),
    [token]
  );

  return (
    <Container>
      <Box></Box>
    </Container>
  );
};
