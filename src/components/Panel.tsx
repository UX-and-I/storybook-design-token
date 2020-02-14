import * as React from 'react';

import { API } from '@storybook/api';
import Channel from '@storybook/channels';
import { styled } from '@storybook/theming';

import { HardCodedValues } from '../interfaces/hard-coded-values.interface';
import { TokenGroup } from '../interfaces/token-group.interface';
import { HardCodedValuesTable } from './HardCodedValuesTable';
import { TokenOverview } from './TokenOverview';

interface Props {
  active: boolean;
  api: API;
  channel: Channel;
  hardCodedValues: HardCodedValues[];
  keyframes: string;
  tokenGroups: TokenGroup[];
}

const Container = styled.div(() => ({
  padding: '12px'
}));

const Separator = styled.hr(() => ({
  backgroundColor: '#f1f1f1',
  border: 'none',
  height: '1px',
  margin: '12px 0',
  width: '100%'
}));

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

      <Container>
        {tokenGroups.map((tokenGroup, index) => (
          <TokenOverview key={index} tokenGroup={tokenGroup} />
        ))}

        <Separator />

        <HardCodedValuesTable hardCodedValues={props.hardCodedValues} />
      </Container>
    </>
  );
};
