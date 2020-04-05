import * as React from 'react';

import { Box } from '../primitives/Box';

interface Props {
  animation: string;
}

export const AnimationToken = ({ animation }: Props) => {
  return <Box style={{ animation, backgroundColor: '#000' }} />;
};
