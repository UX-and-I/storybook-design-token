import * as React from 'react';

import { Box } from '../Primitives/Box';

interface Props {
  opacity: number;
}

export const OpacityToken = ({ opacity }: Props) => {
  return <Box style={{ backgroundColor: '#000', opacity }} />;
};
