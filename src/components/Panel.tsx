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

  public tokenGroups;

  public handleChange(payload) {
    const { key, value, resetting } = payload;
    this.tokenGroups.map((tokenGroup, groupIndex) => {
      tokenGroup.tokens.map((token, tokenIndex) => {
        if (token.key === key) {
          if (resetting) {
            this.tokenGroups[groupIndex].tokens[tokenIndex].value = this.tokenGroups[groupIndex].tokens[tokenIndex].originalValue;
            this.tokenGroups[groupIndex].tokens[tokenIndex].updated = false;
          } else {
            if (!this.tokenGroups[groupIndex].tokens[tokenIndex].originalValue) {
              this.tokenGroups[groupIndex].tokens[tokenIndex].originalValue = this.tokenGroups[groupIndex].tokens[tokenIndex].value;
            }
            this.tokenGroups[groupIndex].tokens[tokenIndex].value = value;
            this.tokenGroups[groupIndex].tokens[tokenIndex].updated = true;
          }
        }
      });
    });
  }

  public render() {
    if (!this.props.active) {
      return <>Test</>;
    }

    this.tokenGroups = this.props.tokenGroups.sort((a, b) => {
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

          {this.tokenGroups
            .filter(tokenGroup => tokenGroup.tokens.length > 0)
            .map((tokenGroup, index) => (
              <TokenOverview
                key={index}
                tokenGroups={this.tokenGroups}
                tokenGroup={tokenGroup}
                onChange={this.handleChange}
                viewType={this.state.viewType}
              />
            ))}

          <Separator />

          {this.props.hardCodedValues.length ? (
            <HardCodedValuesTable
              hardCodedValues={this.props.hardCodedValues}
            />
          ) : null}
        </Container>
      </>
    );
  }
}
