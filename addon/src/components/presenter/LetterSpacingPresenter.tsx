import React from "react";
import { useMemo } from "react";
import { styled } from "@storybook/theming";
import { PresenterProps } from "../../types/token.types";

export const LetterSpacingPresenter = ({
  token
}: PresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        height: "100%",
        letterSpacing: token.value,
        overflow: "auto",
        width: "100%",
      })),
    [token]
  );

  return (
    <Box>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam veniam eum
      dicta.
    </Box>
  );
};
