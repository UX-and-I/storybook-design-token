import React from "react";
import { useMemo } from "react";
import { styled } from "@storybook/theming";
import { PresenterProps } from "../../types/token.types";

export const BorderPresenter = ({ token }: PresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        border: token.value,
        height: 32,
        width: "100%",
      })),
    [token]
  );

  return <Box></Box>;
};
