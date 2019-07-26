import './Collapsible.css';

import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';

import { ShButton } from '../Button/Button';

interface CollapsibleProps {
  children?: ReactNode;
  startCollapsed?: boolean;
  title?: string;
}

export function ShCollapsible({
  children,
  startCollapsed,
  title
}: CollapsibleProps) {
  const [collapsed, setCollapsed] = useState(startCollapsed);

  const className = classNames('sh-collapsible', {
    'sh-collapsible--collapsed': collapsed
  });

  return (
    <div className={className}>
      <header
        className="sh-collapsible__header"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="sh-collapsible__title">{title}</span>
        <ShButton
          appearance="link"
          className="sh-collapsible__toggle"
          iconLeft={collapsed ? 'chevron-right' : 'chevron-down'}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            setCollapsed(!collapsed);
          }}
        />
      </header>
      <div className="sh-collapsible__content">{children}</div>
    </div>
  );
}
