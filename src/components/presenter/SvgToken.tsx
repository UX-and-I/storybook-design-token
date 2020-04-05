import * as React from 'react';

interface Props {
  svg: string;
}

export const SvgToken = ({ svg }: Props) => {
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};
