import * as React from 'react';

import { Text } from '../primitives/Text';

interface Props {
  fontSize: string;
}

export const FontSizeToken = ({ fontSize }: Props) => {
  return <Text style={{ fontSize }}>Lorem ipsum</Text>;
};
