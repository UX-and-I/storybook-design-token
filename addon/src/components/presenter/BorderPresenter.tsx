import { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface BorderPresenterProps {
  token: Token;
}

export const BorderPresenter = ({ token }: BorderPresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        border: token.value,
        height: 32,
        width: '100%'
      })),
    [token]
  );

  return <Box></Box>;
};
