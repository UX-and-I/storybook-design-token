import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface LineHeightPresenterProps {
  token: Token;
}

export const LineHeightPresenter = ({ token }: LineHeightPresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        lineHeight: token.value,
        width: '100%'
      })),
    [token]
  );

  return (
    <Box>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam veniam eum
      dicta.
    </Box>
  );
};
