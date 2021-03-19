import React, { useEffect, useMemo, useState } from 'react';

import { Icons } from '@storybook/components';
import { Input } from '@storybook/components/dist/form/input/input';
import { styled } from '@storybook/theming';

import { Token, TokenSourceType } from '../types/token.types';
import { ToolButton } from './ToolButton';

interface TokenValueProps {
  onValueChange: (newValue: any) => void;
  readonly?: boolean;
  token: Token;
}

export const TokenValue = ({
  onValueChange,
  readonly,
  token
}: TokenValueProps) => {
  const [rawValue, setRawValue] = useState(token.rawValue);

  const Container = useMemo(
    () =>
      styled.div(() => ({
        position: 'relative'
      })),
    []
  );

  const ResetButton = useMemo(
    () =>
      styled.span(() => ({
        position: 'absolute',
        right: 8,
        top: '50%',
        transform: 'translate3d(0, -50%, 0)'
      })),
    []
  );

  useEffect(() => {
    const previewIframe: HTMLIFrameElement = document.querySelector(
      '#storybook-preview-iframe'
    ) as HTMLIFrameElement;

    if (token.rawValue !== rawValue) {
      previewIframe?.contentWindow?.document.documentElement.style.setProperty(
        token.name,
        rawValue
      );
    } else {
      previewIframe?.contentWindow?.document.documentElement.style.setProperty(
        token.name,
        token.rawValue
      );
    }
  }, [rawValue]);

  return (
    <Container>
      {token.sourceType !== TokenSourceType.CSS &&
        token.sourceType !== TokenSourceType.SVG && <span>{rawValue}</span>}

      {(token.sourceType === TokenSourceType.CSS ||
        token.sourceType === TokenSourceType.SVG) && (
        <Input
          readOnly={readonly}
          onChange={(event) => {
            const newRawValue = (event.target as HTMLInputElement).value;

            setRawValue(newRawValue);
            onValueChange(newRawValue);
          }}
          size="100%"
          value={rawValue}
        />
      )}

      {token.rawValue !== rawValue && (
        <ResetButton>
          <ToolButton
            onClick={() => {
              setRawValue(token.rawValue);
              onValueChange(token.rawValue);
            }}
          >
            <Icons icon="close" />
          </ToolButton>
        </ResetButton>
      )}
    </Container>
  );
};
