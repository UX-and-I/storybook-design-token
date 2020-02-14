import * as React from 'react';

import { Box } from '../primitives/Box';

interface Props {
  shadow: string;
}

export const ShadowToken = ({ shadow }: Props) => {
  return (
    <Box
      style={{ boxShadow: shadow, margin: '30px', width: 'calc(100% - 60px)' }}
    />
  );
};
