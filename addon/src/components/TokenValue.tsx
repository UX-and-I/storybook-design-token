import React from "react";
import { useEffect, useMemo, useState } from "react";
import { CloseIcon } from "@storybook/icons";
import { styled } from "storybook/theming";
import { Token, TokenSourceType } from "../types/token.types";
import { Input } from "./Input";
import { ToolButton } from "./ToolButton";

interface TokenValueProps {
  onValueChange: (newValue: any) => void;
  readonly?: boolean;
  token: Token;
}

export const TokenValue = ({
  onValueChange,
  readonly,
  token,
}: TokenValueProps) => {
  const [rawValue, setRawValue] = useState(token.rawValue);

  const Container = useMemo(
    () =>
      styled.div(({}) => ({
        position: "relative",
      })),
    []
  );

  const ResetButton = useMemo(
    () =>
      styled.span(({}) => ({
        position: "absolute",
        right: 8,
        top: "50%",
        transform: "translate3d(0, -50%, 0)",
      })),
    []
  );

  const RawValue = useMemo(
    () =>
      styled.span(({}) => ({
        overflow: "hidden",
        wordBreak: "break-all",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
      })),
    []
  );

  const showRawValue =
    token.sourceType !== TokenSourceType.CSS &&
    token.sourceType !== TokenSourceType.SVG;

  useEffect(() => {
    const previewIframe: HTMLIFrameElement = document.querySelector(
      "#storybook-preview-iframe"
    ) as HTMLIFrameElement;

    const tokenElement = previewIframe?.contentWindow?.document.documentElement;

    if (tokenElement !== undefined && tokenElement !== null) {
      if (token.rawValue !== rawValue) {
        tokenElement.style.setProperty(token.name, rawValue);
      } else {
        tokenElement.style.setProperty(token.name, token.rawValue);
      }
    }
  }, [rawValue]);

  return (
    <Container>
      {showRawValue && <RawValue title={rawValue}>{rawValue}</RawValue>}

      {!showRawValue && (
        <Input
          readOnly={readonly}
          onChange={(event) => {
            const newRawValue = (event.target as HTMLInputElement).value;

            setRawValue(newRawValue);
            onValueChange(newRawValue);
          }}
          value={rawValue}
        />
      )}

      {!showRawValue && token.rawValue !== rawValue && (
        <ResetButton>
          <ToolButton
            onClick={() => {
              setRawValue(token.rawValue);
              onValueChange(token.rawValue);
            }}
          >
            <CloseIcon />
          </ToolButton>
        </ResetButton>
      )}
    </Container>
  );
};
