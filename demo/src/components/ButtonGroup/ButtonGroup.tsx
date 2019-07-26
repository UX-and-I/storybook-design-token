import './ButtonGroup.css';

import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface ButtonGroupProps {
  children: ReactNode;
  spacing?: string;
}

export function ShButtonGroup({ children, spacing }: ButtonGroupProps) {
  const className = classNames('sh-button-group', {
    [`sh-button-group--spacing-${spacing}`]: !!spacing
  });

  return <div className={className}>{children}</div>;
}
