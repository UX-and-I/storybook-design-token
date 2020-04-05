import * as React from 'react';

import { styled } from '@storybook/theming';

import { IconClose } from './Icons';

interface Props {
  onChange: (value: string) => any;
  onReset: () => any;
  showReset?: boolean;
  value: string;
}

const Container = styled.div(() => ({
  display: 'flex',

  '& > input': {
    display: 'block',
    fontFamily: 'monospace',
    padding: '4px',
    width: '100%'
  },

  '& > button': {
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    border: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    display: 'flex',
    height: '28px',
    justifyContent: 'center',
    padding: 0,
    marginLeft: '4px',
    width: '28px',

    '&:hover': {
      backgroundColor: '#f1f1f1'
    },

    '& > svg': {
      height: '16px',
      width: '16px'
    }
  }
}));

export const Input = ({ onChange, onReset, showReset, value }: Props) => {
  return (
    <Container>
      <input
        onChange={event => onChange(event.target.value)}
        type="text"
        value={value}
      />
      {showReset && (
        <button onClick={() => onReset()} type="button">
          {IconClose}
        </button>
      )}
    </Container>
  );
};
