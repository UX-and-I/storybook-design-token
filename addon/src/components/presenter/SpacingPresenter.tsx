import React from "react";
import { useMemo } from "react";
import { styled } from "@storybook/theming";
import { Token } from "../../types/token.types";

interface SpacingPresenterProps {
  token: Token;
}

export const SpacingPresenter = ({ token }: SpacingPresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(({ theme }) => ({
        background: theme.color.secondary,
        borderRadius: 2,
        height: 32,
        width: token.value,
      })),
    [token]
  );

  return <Box />;
};
