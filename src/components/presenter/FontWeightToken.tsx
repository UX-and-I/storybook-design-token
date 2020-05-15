import * as React from 'react';

import { Text } from '../primitives/Text';

interface Props {
  fontWeight: number;
}

export const FontWeightToken = ({ fontWeight }: Props) => {
  return <Text style={{ fontWeight }}>Lorem ipsum</Text>;
};
