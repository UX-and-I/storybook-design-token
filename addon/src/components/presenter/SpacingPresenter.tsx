import React from "react";
import { useMemo } from "react";
import { styled } from "@storybook/theming";
import { PresenterProps } from "../../types/token.types";

export const SpacingPresenter = ({ token }: PresenterProps) => {
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
