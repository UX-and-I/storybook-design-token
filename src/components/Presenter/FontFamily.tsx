import * as React from 'react';

import { Text } from '../Primitives/Text';

interface Props {
  fontFamily: string;
}

export const FontFamilyToken = ({ fontFamily }: Props) => {
  return <Text style={{ fontFamily }}>Lorem ipsum</Text>;
};
