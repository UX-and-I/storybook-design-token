import React from 'react';
import { Icons } from '@storybook/components';
import { styled } from '@storybook/theming';
import { Input } from './Input';

const SearchHolder = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '&:focus-within svg': {
    color: theme.color.defaultText,
  },
  margin: '8px 4px'
}));

const SearchIcon = styled(Icons)(({ theme }) => ({
  width: 12,
  height: 12,
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 1,
  pointerEvents: 'none',
  color: theme.textMutedColor,
}));

const ClearIcon = styled(Icons)(({ theme }) => ({
  width: 16,
  height: 16,
  padding: 4,
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 1,
  background: 'rgba(0,0,0,0.1)',
  borderRadius: 16,
  color: theme.color.defaultText,
  cursor: 'pointer',
}));

const SearchInput = styled(Input)(({ theme }) => ({
  paddingLeft: 28,
  paddingRight: 28, 
  height: 32
}));

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <SearchHolder className="search-field">
      <SearchIcon icon="search" />
      <SearchInput value={value} onChange={e => onChange(e.target.value)} />
      <ClearIcon icon="cross" onClick={() => onChange('')} />
    </SearchHolder >
  )
}