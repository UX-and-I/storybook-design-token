import { Parser } from '../interfaces/parser.interface';
import { TokenFiles } from '../interfaces/token-files.interface';
import { TokenGroup } from '../interfaces/token-group.interface';

export class SvgIconParser implements Parser {
  public parse(
    tokenFiles: TokenFiles
  ): { tokenGroups: TokenGroup[]; keyframes: string } {
    return {
      tokenGroups: this.mapTokenFilesToTokenGroups(tokenFiles),
      keyframes: ''
    };
  }

  private mapTokenFilesToTokenGroups(tokenFiles: TokenFiles): TokenGroup[] {
    if (!tokenFiles || !tokenFiles.svgIcons) {
      return [];
    }

    return [
      {
        label: 'Icons',
        presenter: 'Svg',
        tokens: tokenFiles.svgIcons.map((file) => {
          const div = document.createElement('div');
          div.innerHTML = file.content;
          return {
            editable: false,
            key: div.querySelector('svg').getAttribute('data-token-name'),
            value: file.content
          };
        })
      }
    ];
  }
}
