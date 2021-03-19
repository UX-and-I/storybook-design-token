import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

export const EmptyPresenter = () => {
  const Container = useMemo(
    () =>
      styled.div(({ theme }) => ({
        alignItems: 'center',
        color: theme.color.mediumdark,
        display: 'flex',
        height: 32,
        width: '100%'
      })),
    []
  );

  return <Container>No preview available.</Container>;
};
