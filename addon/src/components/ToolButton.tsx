import { MouseEventHandler, ReactNode, useMemo } from 'react';

import { styled } from '@storybook/theming';

interface ToolButtonProps {
  children: ReactNode | ReactNode[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ToolButton = ({ children, onClick }: ToolButtonProps) => {
  const Button = useMemo(
    () =>
      styled.button(({ theme }) => ({
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        height: 18,
        justifyContent: 'center',
        marginLeft: 4,
        padding: 0,
        verticalAlign: 'middle',
        width: 18,

        '&:hover': {
          color: theme.color.secondary
        },

        '> svg': {
          height: 13,
          position: 'relative',
          top: -1,
          width: 13
        }
      })),
    []
  );

  return <Button onClick={onClick}>{children}</Button>;
};
