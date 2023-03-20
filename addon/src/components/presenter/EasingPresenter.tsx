import { useMemo } from 'react';

import { keyframes, styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface EasingPresenterProps {
  token: Token;
}

export const EasingPresenter = ({ token }: EasingPresenterProps) => {
  const animation = keyframes`
    0% {
      transform: scaleX(0);
    }
    50% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  `;

  const Box = useMemo(
    () =>
      styled.div(({ theme }) => ({
        animation: `${animation} 2s infinite`,
        animationTimingFunction: token.value,
        background: theme.color.secondary,
        borderRadius: 2,
        height: 32,
        transformOrigin: 'left',
        width: '100%'
      })),
    [token]
  );

  return <Box />;
};
