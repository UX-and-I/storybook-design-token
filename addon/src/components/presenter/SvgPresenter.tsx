import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { PresenterProps } from '../../types/token.types';

export const SvgPresenter = ({ token }: PresenterProps) => {
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
