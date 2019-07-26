import './Separator.css';

import React from 'react';

interface SeparatorProps {
  label?: string;
}

export function ShSeparator({ label }: SeparatorProps) {
  return (
    <div className="sh-separator">
      <hr />
      <span className="sh-separator__label">{label}</span>
    </div>
  );
}
