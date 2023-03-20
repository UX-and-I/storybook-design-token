import { ReactNode } from 'react';
import useClipboard from 'react-use-clipboard';

interface ClipboardButtonProps {
  button: ReactNode;
  value: string;
}

export const ClipboardButton = ({ button, value }: ClipboardButtonProps) => {
  const [_, setCopied] = useClipboard(value);

  return <span onClick={setCopied}>{button}</span>;
};
