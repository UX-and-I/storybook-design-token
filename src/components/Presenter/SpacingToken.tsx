import * as React from 'react';

import { Box } from '../Primitives/Box';

interface Props {
  spacing: string;
}

export const SpacingToken = ({ spacing }: Props) => {
  return <Box style={{ backgroundColor: '#222', width: spacing }} />;
};
