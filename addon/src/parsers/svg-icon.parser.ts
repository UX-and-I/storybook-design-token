import { Category } from '../types/category.types';
import { File } from '../types/config.types';
import { Token, TokenPresenter, TokenSourceType } from '../types/token.types';

export async function parseSvgFiles(files: File[] = []): Promise<Category> {
  return {
    name: 'SVG Icons',
    presenter: TokenPresenter.SVG,
    tokens: determineTokens(files)
  };
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
          presenter: TokenPresenter.SVG,
          rawValue: svg.outerHTML,
          sourceType: TokenSourceType.SVG,
          value: svg.outerHTML,
          hideValue: true
        }))
        .filter((token) => token.name);
    })
    .flat();
}
