import * as React from 'react';

import { API } from '@storybook/api';
import Channel from '@storybook/channels';
import { styled } from '@storybook/theming';

import { TokenGroup } from '../interfaces/token-group.interface';
import { TokenTable } from './TokenTable';

const Panel = styled.div(() => ({
  color: '#444',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontWeight: 'normal',
  lineHeight: 1.5,
  maxWidth: '940px',
  padding: '20px'
}));

interface Props {
  active: boolean;
  api: API;
  channel: Channel;
  keyframes: string;
  tokenGroups: TokenGroup[];
}

export const DesignTokenPanel = (props: Props) => {
  if (!props.active) {
    return null;
  }

  const tokenGroups = props.tokenGroups.sort((a, b) => {
    const labelA = a.label.toUpperCase();
    const labelB = b.label.toUpperCase();

    return labelA < labelB ? -1 : labelA > labelB ? 1 : 0;
  });

  return (
    <>
      <style>{props.keyframes}</style>
      <Panel>
        {tokenGroups.map((tokenGroup, index) => (
          <TokenTable key={index} tokenGroup={tokenGroup} />
        ))}
      </Panel>
    </>
  );
};
