import * as React from 'react';

import { API } from '@storybook/api';
import Channel from '@storybook/channels';
import { styled } from '@storybook/theming';

import { HardCodedValues } from '../interfaces/hard-coded-values.interface';
import { TokenGroup } from '../interfaces/token-group.interface';
import { HardCodedValuesTable } from './HardCodedValuesTable';
import { TokenOverview } from './TokenOverview';
import { ViewSwitch } from './ViewSwitch';

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

export class DesignTokenPanel extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = { viewType: 'card' };
  }

  public render() {
    if (!this.props.active) {
      return <>Test</>;
    }

    const tokenGroups = this.props.tokenGroups.sort((a, b) => {
      const labelA = a.label.toUpperCase();
      const labelB = b.label.toUpperCase();

      return labelA < labelB ? -1 : labelA > labelB ? 1 : 0;
    });

    return (
      <>
        <style>{this.props.keyframes}</style>

        <Container className="design-token-container">
          <ViewSwitch
            onChange={newViewType =>
              this.setState(() => ({
                viewType: newViewType
              }))
            }
            value={this.state.viewType}
          />

          <Separator />

          {tokenGroups
            .filter(tokenGroup => tokenGroup.tokens.length > 0)
            .map((tokenGroup, index) => (
              <TokenOverview
                key={index}
                tokenGroup={tokenGroup}
                viewType={this.state.viewType}
              />
            ))}

          <Separator />

          <HardCodedValuesTable hardCodedValues={this.props.hardCodedValues} />
        </Container>
      </>
    );
  }
}
