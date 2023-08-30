import React from "react";
import { useMemo } from "react";
import { styled } from "@storybook/theming";
import { PresenterProps } from "../../types/token.types";

export const BorderRadiusPresenter = ({
  token,
}: PresenterProps) => {
  const Container = useMemo(
    () =>
      styled.div(() => ({
        minHeight: 32,
        height: 32,
        overflow: "auto",
      })),
    []
  );

  const Box = useMemo(
    () =>
      styled.div(({ theme }) => ({
        background: theme.color.secondary,
        borderRadius: token.value,
        minHeight: `calc(${token.value} * 2)`,
        minWidth: `calc(${token.value} * 2)`,
        overflow: "hidden",
        width: "100%",
      })),
    [token]
  );

  return (
    <Container>
      <Box></Box>
    </Container>
  );
};
