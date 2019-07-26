import './Button.css';

import classNames from 'classnames';
import React from 'react';

import { ShIcon } from '../Icon/Icon';

interface ButtonProps {
  appearance?: string;
  className?: string;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  label?: string;
  onClick?: any;
  onMouseDown?: any;
  size?: string;
  square?: boolean;
  stretch?: boolean;
  title?: string;
  [props: string]: any;
}

export function ShButton({
  appearance,
  className,
  disabled,
  iconLeft,
  iconRight,
  label,
  onClick,
  onMouseDown,
  size,
  square,
  stretch,
  title,
  ...rest
}: ButtonProps) {
  const buttonClassName = classNames('sh-button', className, {
    [`sh-button--appearance-${appearance}`]: !!appearance,
    [`sh-button--size-${size}`]: !!size,
    'sh-button--only-icon': !label && (iconLeft || iconRight),
    'sh-button--stretch': stretch,
    'sh-button--square': square
  });

  size = size || 'm';

  return (
    <button
      className={buttonClassName}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
      title={title}
      {...rest}
    >
      {iconLeft && (
        <ShIcon
          className="sh-button__icon sh-button__icon--left"
          glyph={iconLeft}
          size={size === 'm' ? 's' : size === 'xl' ? 'l' : 'm'}
        />
      )}
      {label}
      {iconRight && (
        <ShIcon
          className="sh-button__icon sh-button__icon--right"
          glyph={iconRight}
          size={size === 'm' ? 's' : size === 'xl' ? 'l' : 'm'}
        />
      )}
    </button>
  );
}
