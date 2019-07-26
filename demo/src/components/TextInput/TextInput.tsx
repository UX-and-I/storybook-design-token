import './TextInput.css';

import React from 'react';

interface TextInputProps {
  disabled?: boolean;
  id?: string;
  onBlur?: any;
  onChange?: any;
  placeholder?: string;
  rows?: number;
  type?: string;
  [prop: string]: any;
}

export function ShTextInput({
  disabled,
  id,
  onBlur,
  onChange,
  placeholder,
  rows,
  type,
  ...rest
}: TextInputProps) {
  return (
    <>
      {(!rows || rows === 1) && (
        <input
          className="sh-text-input"
          disabled={disabled}
          id={id}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          type={type || 'text'}
          {...rest}
        />
      )}
      {rows && rows > 1 && (
        <textarea
          className="sh-text-input"
          disabled={disabled}
          id={id}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          {...rest}
        />
      )}
    </>
  );
}
