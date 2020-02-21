import * as React from 'react';

import { HardCodedValues } from '../interfaces/hard-coded-values.interface';
import { Collapsible } from './primitives/Collapsible';

interface Props {
  hardCodedValues: HardCodedValues[];
}

export const HardCodedValuesTable = ({ hardCodedValues }: Props) => {
  return (
    <Collapsible id="hard-coded-values" title="Matching Hard Coded Values">
      {hardCodedValues.map((value, index) => (
        <div key={value.token.key + index}>
          {value.token.key}
          <br />
          {value.token.value}
          <br />
          {value.values.map((v, index) => (
            <span key={index}>
              File: <strong>{v.file}</strong>, Line: <strong>{v.line}</strong>
              <br />
            </span>
          ))}
        </div>
      ))}
    </Collapsible>
  );
};
