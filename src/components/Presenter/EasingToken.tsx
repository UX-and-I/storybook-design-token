import * as React from 'react';

import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

const slide = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(114px, 0, 0);
  }
`;

const SmallBox = styled.div(() => ({
  position: 'relative',
  width: '25px',
  height: '25px',
  borderRadius: '4px',
  backgroundColor: '#222',
  animation: `${slide} 1s ease infinite alternate`,
  zIndex: 2
}));

interface Props {
  easing: string;
}

export const EasingToken = ({ easing }: Props) => {
  return <SmallBox style={{ animationTimingFunction: easing }} />;
};
