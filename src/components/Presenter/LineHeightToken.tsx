import * as React from 'react';

import { Text } from '../Primitives/Text';

interface Props {
  lineHeight: number;
}

export const LineHeightToken = ({ lineHeight }: Props) => {
  return (
    <Text
      style={{
        lineHeight,
        whiteSpace: 'normal',
        position: 'relative',
        zIndex: 2
      }}
    >
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.
    </Text>
  );
};
