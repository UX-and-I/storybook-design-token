import * as React from 'react';

import useLocalStorage from '@illinois/react-use-local-storage';
import { useEffect } from '@storybook/addons';
import { styled } from '@storybook/theming';

interface Props {
  onChange?: (view: 'card' | 'table') => any;
  value: 'card' | 'table';
}

const Container = styled.div(() => ({
  backgroundColor: '#f5f5f5',
  borderRadius: '6px',
  display: 'flex',
  padding: '4px'
}));

const Button = styled.button(() => ({
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  flexBasis: 'calc(50% - 4px)',
  flexShrink: 0,
  fontWeight: 500,
  padding: '8px',

  '&:not(:first-of-type)': {
    marginLeft: '2px'
  },

  '&:not(:last-of-type)': {
    marginRight: '2px'
  },

  '&:hover:not(.active)': {
    backgroundColor: '#dedede'
  },

  '&.active': {
    backgroundColor: '#1ea7fd',
    color: '#fff'
  }
}));

export const ViewSwitch = ({ onChange, value }: Props) => {
  const [persistedValue, setPersistedValue] = useLocalStorage(
    `SB_DESIGN_TOKEN_EXPANSION:VIEW_TYPE`,
    value
  );

  const changeValue = React.useCallback(
    (newValue: 'card' | 'table') => {
      if (value !== newValue) {
        setPersistedValue(newValue);
        onChange(newValue);
      }
    },
    [value]
  );

  if (persistedValue && persistedValue !== value) {
    onChange(persistedValue);
  }

  return (
    <Container>
      <Button
        className={value === 'card' ? 'active' : ''}
        onClick={() => changeValue('card')}
        type="button"
      >
        Card View
      </Button>
      <Button
        className={value === 'table' ? 'active' : ''}
        onClick={() => changeValue('table')}
        type="button"
      >
        Table View
      </Button>
    </Container>
  );
};
