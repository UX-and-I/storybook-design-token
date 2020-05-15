import * as React from 'react';

import { Box } from '../primitives/Box';

interface Props {
  borderRadius: string;
}

export const BorderRadiusToken = ({ borderRadius }: Props) => {
  return (
    <Box
      style={{
        borderRadius,
        minHeight: `calc(2 * ${borderRadius} + 10px)`,
        border: '1px solid #222'
      }}
    />
  );
};
