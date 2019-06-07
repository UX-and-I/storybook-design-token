import * as React from 'react';

import { Box } from '../Primitives/Box';

interface Props {
  border: string;
}

export const BorderToken = ({ border }: Props) => {
  return <Box style={{ border }} />;
};
