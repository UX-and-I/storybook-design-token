import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface SvgPresenterProps {
  token: Token;
}

export const SvgPresenter = ({ token }: SvgPresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        alignItems: 'center',
        display: 'flex',
        height: 32,
        width: '100%'
      })),
    [token]
  );

  return <Box dangerouslySetInnerHTML={{ __html: token.value }}></Box>;
};
