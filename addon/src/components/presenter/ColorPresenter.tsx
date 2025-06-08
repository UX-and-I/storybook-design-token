import React from "react";
import { useMemo } from "react";
import { styled } from "storybook/theming";
import { PresenterProps } from "../../types/token.types";

export const ColorPresenter = ({ token }: PresenterProps) => {
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
