import * as React from 'react';

import { HardCodedValues } from '../interfaces/hard-coded-values.interface';
import { Card } from './primitives/Card';
import { Collapsible } from './primitives/Collapsible';

interface Props {
  hardCodedValues: HardCodedValues[];
}

export const HardCodedValuesTable = ({ hardCodedValues }: Props) => {
  return (
    <Collapsible id="hard-coded-values" title="Matching Hard Coded Values">
      {hardCodedValues.map((value, index) => (
        <Card
          description={value.values.map((v, index) => (
            <div
              key={index}
              style={{ marginBottom: '8px', wordBreak: 'break-all' }}
            >
              {v.file}, line {v.line}
            </div>
          ))}
          descriptionLabel="Files"
          key={value.token.key + index}
          title={value.token.key}
          value={value.token.value}
        />
      ))}
    </Collapsible>
  );
};
