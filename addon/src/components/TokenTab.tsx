import React from 'react';
import { TokenCards } from './TokenCards';
import { TokenTable } from './TokenTable';
import { useState } from 'react';
import { SearchField } from './SearchField';
import { useDebounce } from '../hooks/useDebounce';
import { Category } from '../types/category.types';

interface TokenTabProps {
  categories: Category[];
  isCardView: boolean;
}

export function TokenTab({ categories, isCardView }: TokenTabProps) {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 250);
  const resultCategories = debouncedSearchText
    ? categories.map(item => ({
      ...item,
      tokens: item.tokens.filter(token => token.name.includes(debouncedSearchText)),
    }))
    : categories;

  return (
    <div>
      <SearchField value={searchText} onChange={setSearchText} />
      {isCardView && <TokenCards categories={resultCategories} />}
      {!isCardView && <TokenTable categories={resultCategories} />}
    </div>
  );
}