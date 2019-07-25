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
          <tr key={value.token.key}>
            <td>
              <strong>{value.token.key}</strong>
            </td>
            <td>{value.token.value}</td>
            <td>
              {value.values.map((v, index) => (
                <span key={index}>
                  File: <strong>{v.file}</strong>, Line:{' '}
                  <strong>{v.line}</strong>
                  <br />
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
