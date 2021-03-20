import { styled } from '@storybook/theming';

export const Input = styled.input(({ theme }) => ({
  appearance: 'none',
  background: theme.input.background,
  border: '0 none',
  borderRadius: theme.input.borderRadius,
  boxShadow: `${theme.input.border} 0 0 0 1px inset`,
  boxSizing: 'inherit',
  color: theme.input.color || 'inherit',
  display: ' block',
  fontSize: theme.typography.size.s2 - 1,
  lineHeight: '20px',
  margin: ' 0',
  padding: '6px 10px',
  position: 'relative',
  transition: 'all 200ms ease-out',
  width: '100%',

  '&:focus': {
    boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
    outline: 'none'
  },
  '&[disabled]': {
    cursor: 'not-allowed',
    opacity: 0.5
  },

  '&:-webkit-autofill': {
    WebkitBoxShadow: `0 0 0 3em ${theme.color.lightest} inset`
  },

  '::placeholder': {
    color: theme.color.mediumdark
  }
}));
