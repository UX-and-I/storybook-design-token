import { useMemo, useState } from 'react';
import { Category } from '../types/category.types';
import { useDebounce } from './useDebounce';

export function useTokenSearch(categories: Category[]) {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 250);
  const resultCategories = useMemo(() => {
    return debouncedSearchText
      ? categories?.map(item => ({
        ...item,
        tokens: item.tokens.filter(token => token.name.includes(debouncedSearchText)),
      }))
      : categories;
  }, [debouncedSearchText, categories]);

  return {
    categories: resultCategories,
    searchText,
    setSearchText,
  }
}