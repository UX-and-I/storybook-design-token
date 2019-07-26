import './Menu.css';

import React, { PropsWithChildren } from 'react';

export function ShMenu({ children }: PropsWithChildren<{}>) {
  return <div className="sh-menu">{children}</div>;
}
