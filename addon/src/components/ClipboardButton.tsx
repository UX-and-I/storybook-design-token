import React from "react";
import { ReactNode } from "react";
import { useCopyToClipboard } from "@uidotdev/usehooks";

interface ClipboardButtonProps {
  button: ReactNode;
  value: string;
}

export const ClipboardButton = ({ button, value }: ClipboardButtonProps) => {
  const [_, setCopied] = useCopyToClipboard();

  return <span onClick={() => setCopied(value)}>{button}</span>;
};
