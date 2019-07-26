import './MenuItem.css';

import React from 'react';

import { ShIcon } from '../Icon/Icon';

interface MenuItemProps {
  disabled?: boolean;
  icon?: string;
  label?: string;
  onClick?: any;
}

export function ShMenuItem({ disabled, icon, label, onClick }: MenuItemProps) {
  return (
    <button className="sh-menu-item" disabled={disabled} onClick={onClick}>
      {icon && <ShIcon className="sh-menu-item__icon" glyph={icon} size="s" />}
      {label}
    </button>
  );
}
