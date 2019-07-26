import './Toast.css';

import classNames from 'classnames';
import React from 'react';

import { ShIcon } from '../Icon/Icon';

interface ToastProps {
  appearance?: string;
  message: string;
}

export function ShToast({ appearance, message }: ToastProps) {
  const className = classNames(
    'sh-toast',
    `sh-toast--appearance-${appearance}`
  );

  const icon =
    appearance === 'warning'
      ? 'warning'
      : appearance === 'success'
      ? 'check'
      : 'info';

  return (
    <div className={className}>
      <ShIcon className="sh-toast__icon" glyph={icon} />
      {message}
    </div>
  );
}
