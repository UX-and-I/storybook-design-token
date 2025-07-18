import { styled, keyframes } from "storybook/theming";
import { transparentize } from "polished";

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(5px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const Popup = styled.div(({ theme }) => ({
  position: "absolute",
  background: theme.background.content,
  border: `1px solid ${theme.color.border}`,
  borderRadius: theme.borderRadius,
  padding: "12px 15px",
  boxShadow: `0 4px 12px ${transparentize(0.85, theme.color.darker)}`,
  color: theme.color.defaultText,
  fontFamily: theme.typography.fonts.base,
  fontSize: theme.typography.size.s2,
  minWidth: 150,
  maxWidth: 300,
  zIndex: 1000,
  animation: `${fadeIn} 0.2s ease-out`,

  "& > div:first-child": {
    fontWeight: theme.typography.weight.bold,
    marginBottom: 8,
    color: theme.color.darkest,
  },

  "& > ul": {
    margin: 0,
    padding: 0,
    listStyle: "none",
    maxHeight: 200,
    overflowY: "auto",

    "& > li": {
      padding: "4px 8px",
      borderRadius: theme.borderRadius / 2,
      color: transparentize(0.1, theme.color.defaultText),
      background: transparentize(0.95, theme.color.medium),
      marginBottom: 4,
      transition: "background 0.2s ease",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",

      "&:hover": {
        background: transparentize(0.85, theme.color.medium),
      },

      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
}));
