import * as React from 'react';

import { API } from '@storybook/api';
import Channel from '@storybook/channels';
import { styled } from '@storybook/theming';

import { TokenGroup } from '../interfaces/token-group.interface';
import { TokenTable } from './TokenTable';

const Components = require('@storybook/components');

const Panel = styled.div(() => ({
  padding: '20px',
  maxWidth: '940px'
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

  return (
    <>
      <style>{props.keyframes}</style>
      <Panel>
        <Components.DocumentFormatting>
          {props.tokenGroups
            .sort((a, b) => {
              const labelA = a.label.toUpperCase();
              const labelB = b.label.toUpperCase();

              return labelA < labelB ? -1 : labelA > labelB ? 1 : 0;
            })
            .map((tokenGroup, index) => (
              <TokenTable key={index} tokenGroup={tokenGroup} />
            ))}
        </Components.DocumentFormatting>
      </Panel>
    </>
  );
};
