import * as React from 'react';

import { HardCodedValues } from '../interfaces/hard-coded-values.interface';
import { Table } from './Primitives/Table';

interface Props {
  hardCodedValues: HardCodedValues[];
}

export const HardCodedValuesTable = ({ hardCodedValues }: Props) => {
  return (
    <Table style={{ marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
          <th>Hard coded values</th>
        </tr>
      </thead>
      <tbody>
        {hardCodedValues.map(value => (
          <tr>
            <td>{value.token.key}</td>
            <td>{value.token.value}</td>
            <td>
              {value.values.map(v => (
                <>
                  File: {v.file}, Line: {v.line}
                  <br />
                </>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
