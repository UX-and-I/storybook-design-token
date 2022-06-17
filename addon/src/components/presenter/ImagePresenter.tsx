import React, { useMemo } from 'react';
import { styled } from '@storybook/theming';
import { Token } from '../../types/token.types';

interface ImagePresenterProps {
  token: Token;
}

export function ImagePresenter({ token }: ImagePresenterProps) {
  const Img = useMemo(
    () =>
      styled.img(() => ({
        maxHeight: 32,
        maxWidth: '100%',
        backgroundSize: 'contain'
      })),
    [token]
  );

  return <Img src={`data:image/png;base64, ${token.value}`}></Img>;
}
