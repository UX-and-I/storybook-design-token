import * as React from 'react';

import { Box } from '../primitives/Box';

interface Props {
    gradient: string;
}

export const GradientToken = (props: Props) => {
    return <Box style={{ background: props.gradient }} />;
}