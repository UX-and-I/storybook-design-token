import * as React from 'react';

import { API } from '@storybook/api';
import Channel from '@storybook/channels';
import { styled } from '@storybook/theming';

import { HardCodedValues } from '../interfaces/hard-coded-values.interface';
import { TokenGroup } from '../interfaces/token-group.interface';
import { HardCodedValuesTable } from './HardCodedValuesTable';
import { IconChevronLeft, IconChevronRight } from './Icons';
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

const Button = styled.button(() => ({
  background: 'transparent',
  border: 'none',
  color: '#1ea7fd',
  cursor: 'pointer',
  fontWeight: 'bold',
  padding: 0,

  '& svg': {
    verticalAlign: 'middle',
    position: 'relative',
    top: '-1px',
    width: '16px',
    height: '16px'
  }
}));

const Note = styled.div(() => ({
  backgroundColor: '#1ea7fd',
  borderRadius: '4px',
  color: '#fff',
  display: 'flex',
  padding: '8px 12px',
  marginBottom: '20px',

  '& span': {
    flexGrow: 1
  },

  '& button': {
    color: '#fff'
  }
}));

interface Props {
  active: boolean;
  api: API;
  channel: Channel;
  hardCodedValues: HardCodedValues[];
  keyframes: string;
  tokenGroups: TokenGroup[];
}

export const DesignTokenPanel = (props: Props) => {
  const [showHardCodedValues, setShowHardCodedValues] = React.useState(false);

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
        {!showHardCodedValues && (
          <>
            {props.hardCodedValues && props.hardCodedValues.length > 0 && (
              <Note>
                <span>
                  There might be hard coded values in your stylesheets that
                  could use the design tokens.
                </span>
                <Button
                  onClick={() => setShowHardCodedValues(true)}
                  type="button"
                >
                  Show {IconChevronRight}
                </Button>
              </Note>
            )}
            {tokenGroups.map((tokenGroup, index) => (
              <TokenTable key={index} tokenGroup={tokenGroup} />
            ))}
          </>
        )}

        {showHardCodedValues && (
          <>
            <Button onClick={() => setShowHardCodedValues(false)} type="button">
              {IconChevronLeft} Back
            </Button>
            <HardCodedValuesTable hardCodedValues={props.hardCodedValues} />
          </>
        )}
      </Panel>
    </>
  );
};
