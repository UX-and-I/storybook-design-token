import React from "react";
import { useMemo } from "react";
import { styled } from "storybook/theming";
import { PresenterProps } from "../../types/token.types";

export const AnimationPresenter = ({ token }: PresenterProps) => {
  const Animation = useMemo(
    () =>
      styled.div(({ theme }) => ({
        background: theme.color.secondary,
        borderRadius: 2,
        height: 32,
        width: "100%",
      })),
    [token]
  );

  return (
    <div style={{ overflow: "hidden" }}>
      <Animation style={{ animation: token.value }}></Animation>
    </div>
  );
};
