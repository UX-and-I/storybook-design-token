import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { PresenterProps } from '../../types/token.types';

export const ShadowPresenter = ({ token }: PresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(({ theme }) => ({
        background: '#fff',
        boxShadow: token.value,
        height: 32,
        width: '100%'
      })),
    [token]
  );

  return <Box></Box>;
};
