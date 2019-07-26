import './Icon.css';

import classNames from 'classnames';
import React from 'react';

interface IconProps {
  className?: string;
  glyph: string;
  size?: string;
}

export function ShIcon({ className, glyph, size }: IconProps) {
  className = classNames(className, 'sh-icon', {
    [`sh-icon--size-${size}`]: !!size
  });

  return (
    <svg className={className}>
      <use xlinkHref={`#${glyph}`} />
    </svg>
  );
}
