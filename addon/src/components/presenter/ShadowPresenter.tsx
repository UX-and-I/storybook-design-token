import React from "react";
import { useMemo } from "react";
import { styled } from "@storybook/theming";
import { Token } from "../../types/token.types";

interface ShadowPresenterProps {
  token: Token;
}

export const ShadowPresenter = ({ token }: ShadowPresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(({ theme }) => ({
        background: "#fff",
        boxShadow: token.value,
        height: 32,
        width: "100%",
      })),
    [token]
  );

  return <Box></Box>;
};
