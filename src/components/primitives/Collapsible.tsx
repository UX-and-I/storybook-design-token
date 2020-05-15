import * as React from 'react';
import { useLocalStorageState } from 'react-storage-hooks';

import { styled } from '@storybook/theming';

import { IconChevronDown, IconChevronRight } from './Icons';

interface Props {
  children: React.ReactNode;
  id: string;
  title: string;
}

const Container = styled.div(() => ({
  border: '1px solid #dedede',
  borderRadius: '4px',

  '&:not(:last-child)': {
    marginBottom: '12px'
  }
}));

const Header = styled.div(() => ({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  fontWeight: 500,
  padding: '8px',

  '&:hover': {
    color: '#1ea7fd'
  },

  '& > svg': {
    height: '15px',
    marginRight: '4px',
    width: '15px'
  }
}));

const Body = styled.div(() => ({
  borderTop: '1px solid #dedede',
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'auto',
  padding: '8px 4px',

  '& > *': {
    flexBasis: '100%',
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: '8px'
  }
}));

export const Collapsible = ({ children, id, title }: Props) => {
  const [expanded, setExpanded] = useLocalStorageState(
    `SB_DESIGN_TOKEN_EXPANSION:${id}`,
    false
  );

  return (
    <Container>
      <Header id={id} onClick={() => setExpanded(!expanded)}>
        {!expanded ? IconChevronRight : IconChevronDown}
        {title}
      </Header>
      {expanded && <Body>{children}</Body>}
    </Container>
  );
};
