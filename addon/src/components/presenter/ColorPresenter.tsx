import React from "react";
import { useMemo } from "react";
import { styled } from "@storybook/theming";
import { Token } from "../../types/token.types";

interface ColorPresenterProps {
  token: Token;
}

export const ColorPresenter = ({ token }: ColorPresenterProps) => {
  const Color = useMemo(
    () =>
      styled.div(() => ({
        background: token.value,
        borderRadius: 2,
        height: 32,
        width: "100%",
      })),
    [token]
  );

  return <Color></Color>;
};
