import React from "react";
import { PresenterProps } from "src/types/token.types";

export function CircleColorPresenter({ token }: PresenterProps) {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: token.value,
      }}
    ></div>
  );
}
