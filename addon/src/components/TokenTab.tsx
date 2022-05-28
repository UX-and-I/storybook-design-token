import React from 'react';
import { TokenCards } from './TokenCards';
import { TokenTable } from './TokenTable';
import { useState } from 'react';
import { SearchField } from './SearchField';
import { useDebounce } from '../hooks/useDebounce';
import { Category } from '../types/category.types';

interface TokenTabProps {
  categories: Category[];
  cardView: boolean;
}

export function TokenTab({ categories, cardView }: TokenTabProps) {
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
      {cardView && <TokenCards categories={resultCategories} />}
      {!cardView && <TokenTable categories={resultCategories} />}
    </div>
  );
}