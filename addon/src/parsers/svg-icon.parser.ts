import { JSDOM } from 'jsdom';
import { basename, extname } from 'path';

import { Category } from '../types/category.types';
import { File } from '../types/config.types';
import { Token, TokenPresenter, TokenSourceType } from '../types/token.types';
import { extname, basename, dirname, relative } from 'path';

export async function parseSvgFiles(
  files: File[] = []
): Promise<{ categories: Category[] }> {
  const tokens = determineTokens(files);

  let categoryNames = tokens
    .map((token) => token.categoryName)
    .filter((v, i, a) => a.indexOf(v) === i);

  return {
    categories: categoryNames.map((name) => {
      return {
        name: name || 'SVG Icons',
        presenter: TokenPresenter.SVG,
        tokens: tokens.filter((token) => token.categoryName === name)
      };
    })
  };
}

function determineTokens(files: File[]): Token[] {
  if (!files) {
    return [];
  }

  const { document } = new JSDOM().window;

  return files
    .map((file) => {
      const div = document.createElement('div');
      div.innerHTML = file.content;

      const svgs = Array.from(div.querySelectorAll('svg'));
      const name = basename(file.filename, extname(file.filename));

      return svgs
        .map((svg, index, array) => ({
          name:
            svg?.getAttribute('data-token-name') ||
            svg?.getAttribute('id') ||
            (array.length > 1 ? `${name}-${index + 1}`: name),
          description: svg?.getAttribute('data-token-description') || '',
          categoryName: svg?.getAttribute('data-token-category') || 'SVG Icons',
          presenter: TokenPresenter.SVG,
          rawValue: svg.outerHTML,
          sourceType: TokenSourceType.SVG,
          value: svg.outerHTML
        }))
        .filter((token) => token.name);
    })
    .flat();
}
