import React from 'react';

const styles = {
  padding: '18px'
};

export const PaddingDecorator = (storyFn: any) => {
  return <div style={styles}>{storyFn()}</div>;
};
