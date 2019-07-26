import './Avatar.css';

import React from 'react';

interface AvatarProps {
  image?: string;
  name?: string;
  onClick?: any;
}

const extractInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.substr(0, 1))
    .join('')
    .toUpperCase();
};

export function ShAvatar({ image, name, onClick }: AvatarProps) {
  return (
    <div className="sh-avatar" onClick={onClick} title={name}>
      {image && <img src={image} alt="" />}
      {!image && name && extractInitials(name)}
    </div>
  );
}
