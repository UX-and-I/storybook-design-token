import { useMemo } from "react";
import { Token } from "../types/token.types";
import { Category } from "../types/category.types";

export const useFilteredTokens = (
  categories: Category[],
  filterNames?: string[],
  theme?: string
): Token[] => {
  return useMemo(() => {
    const allTokens = categories.flatMap((category) => category.tokens);

    // Filter tokens by theme if passed
    const themeFilteredTokens = theme
      ? allTokens.filter((token) => {
          const tokenTheme = token.sourcePath.includes(theme);
          return tokenTheme;
        })
      : allTokens;

    // Filter tokens by variable name
    const nameFilteredTokens = filterNames
      ? themeFilteredTokens.filter((token) => filterNames.includes(token.name))
      : themeFilteredTokens;

    // Make tokens unique
    const uniqueTokens = nameFilteredTokens.filter(
      (token, index, self) =>
        self.findIndex((t) => t.name === token.name) === index
    );

    return uniqueTokens;
  }, [categories, filterNames, theme]);
};
