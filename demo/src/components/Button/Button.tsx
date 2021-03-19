import './Button.css';

import React from 'react';

export interface ButtonProps {
  label: string;
}

export const DtButton: React.FC<ButtonProps> = ({ label }: ButtonProps) => {
  return (
    <button className="button" type="button">
      {label}
    </button>
  );
};
