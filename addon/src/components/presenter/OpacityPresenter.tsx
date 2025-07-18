import React from "react";
import { useMemo } from "react";
import { styled } from "storybook/theming";
import { PresenterProps } from "../../types/token.types";

export const OpacityPresenter = ({ token }: PresenterProps) => {
  const Container = useMemo(
    () =>
      styled.div(() => ({
        display: "flex",
        height: "2rem",
        width: "100%",
      })),
    [token]
  );

  const Circle = useMemo(
    () =>
      styled.div(() => ({
        backgroundColor: "#000",
        borderRadius: "50%",
        height: "2rem",
        opacity: token.value,
        width: "2rem",

        "&:nth-of-type(2)": {
          transform: "translateX(-50%)",
        },
      })),
    [token]
  );

  return (
    <Container>
      <Circle />
      <Circle />
    </Container>
  );
};
