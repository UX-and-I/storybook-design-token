import React from "react";
import { useMemo } from "react";
import { styled } from "storybook/theming";
import { PresenterProps } from "../../types/token.types";

export const FontWeightPresenter = ({ token }: PresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        fontWeight: token.value as "bold" | "normal" | number,
        width: "100%",
      })),
    [token]
  );

  return <Box>Lorem ipsum</Box>;
};
