import * as React from 'react';

import { styled } from '@storybook/theming';

interface Props {
  aliases?: string;
  description?: React.ReactNode;
  preview?: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
}

const Container = styled.div(() => ({
  border: '1px solid #f1f1f1',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0
}));

const Header = styled.div(() => ({
  backgroundColor: '#f1f1f1',
  fontWeight: 500,
  padding: '8px'
}));

const Body = styled.div(() => ({}));

const Section = styled.div(() => ({
  padding: '8px',

  '& > strong': {
    display: 'block',
    marginBottom: '4px'
  },

  '& > input': {
    display: 'block',
    padding: '4px',
    width: '100%'
  }
}));

const Preview = styled.div(() => ({
  border: '1px solid #f1f1f1',
  margin: '8px',
  overflow: 'hidden',
  padding: '2px'
}));

export const Card = ({
  aliases,
  description,
  preview,
  title,
  value
}: Props) => {
  return (
    <Container>
      <Header>{title}</Header>
      <Body>
        {preview && <Preview>{preview}</Preview>}
        <Section>
          <strong>Value</strong>
          {value}
        </Section>
        {description && (
          <Section>
            <strong>Description</strong>
            {description}
          </Section>
        )}
        {aliases && (
          <Section>
            <strong>Aliases</strong>
            {aliases}
          </Section>
        )}
      </Body>
    </Container>
  );
};
