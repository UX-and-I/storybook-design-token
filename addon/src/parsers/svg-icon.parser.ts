import { Category } from '../types/category.types';
import { File } from '../types/config.types';
import { Token, TokenPresenter, TokenSourceType } from '../types/token.types';

export async function parseSvgFiles(files: File[] = []): Promise<Category[]> {
  const tokens = determineTokens(files);
  let categoryNames = tokens.map(token => token.categoryName).filter((v, i, a) => a.indexOf(v) === i);
  return categoryNames.map(name => {
    return {
      name: name || "SVG Icons",
      presenter: TokenPresenter.SVG,
      tokens: tokens.filter(token => token.categoryName === name)
    }
  });
}

function determineTokens(files: File[]): Token[] {
  if (!files) {
    return [];
  }

  return files
    .map((file) => {
      const div = document.createElement('div');
      div.innerHTML = file.content;

      const svgs = Array.from(div.querySelectorAll('svg'));

      return svgs
        .map((svg) => ({
          name:
            svg?.getAttribute('data-token-name') ||
            svg?.getAttribute('id') ||
            '',
          description:
            svg?.getAttribute('data-token-description') ||
            '',
          categoryName:
            svg?.getAttribute('data-token-category') ||
            'SVG Icons',
          presenter: TokenPresenter.SVG,
          rawValue: svg.outerHTML,
          sourceType: TokenSourceType.SVG,
          value: svg.outerHTML
        }))
        .filter((token) => token.name);
    })
    .flat();
}
