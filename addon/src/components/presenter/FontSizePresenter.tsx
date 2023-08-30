import React from "react";
import { useMemo } from "react";
import { styled } from "@storybook/theming";
import { PresenterProps } from "../../types/token.types";

export const FontSizePresenter = ({ token }: PresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        fontSize: token.value,
        height: token.value,
        lineHeight: 1,
        whiteSpace: "nowrap",
        width: "100%",
      })),
    [token]
  );

  return <Box>Lorem ipsum</Box>;
};
