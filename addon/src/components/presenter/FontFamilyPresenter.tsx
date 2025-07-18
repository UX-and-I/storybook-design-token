import React from "react";
import { useMemo } from "react";
import { styled } from "storybook/theming";
import { PresenterProps } from "../../types/token.types";

export const FontFamilyPresenter = ({ token }: PresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        fontFamily: token.value,
        width: "100%",
      })),
    [token]
  );

  return <Box>Lorem ipsum</Box>;
};
