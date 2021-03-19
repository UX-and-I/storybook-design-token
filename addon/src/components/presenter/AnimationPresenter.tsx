import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface AnimationPresenterProps {
  token: Token;
}

export const AnimationPresenter = ({ token }: AnimationPresenterProps) => {
  const Animation = useMemo(
    () =>
      styled.div(({ theme }) => ({
        background: theme.color.secondary,
        borderRadius: 2,
        height: 32,
        width: '100%'
      })),
    [token]
  );

  return (
    <div style={{ overflow: 'hidden' }}>
      <Animation style={{ animation: token.value }}></Animation>
    </div>
  );
};
