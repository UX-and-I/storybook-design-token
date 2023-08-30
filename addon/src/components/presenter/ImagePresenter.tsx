import React from "react";
import { useMemo } from "react";
import { styled } from "@storybook/theming";
import { PresenterProps } from "../../types/token.types";


export function ImagePresenter({ token }: PresenterProps) {
  const Img = useMemo(
    () =>
      styled.img(() => ({
        maxHeight: 32,
        maxWidth: "100%",
        backgroundSize: "contain",
      })),
    [token]
  );

  return <Img src={`data:image/png;base64, ${token.value}`}></Img>;
}
