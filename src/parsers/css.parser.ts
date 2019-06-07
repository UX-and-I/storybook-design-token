import { Parser } from '../interfaces/parser.interface';
import { TokenFiles } from '../interfaces/token-files.interface';
import { TokenGroup } from '../interfaces/token-group.interface';
import { Token } from '../interfaces/token.interface';

const mensch: any = require('mensch');
const parseCommentBlock = require('comment-parser/parser.js');

export class CssParser implements Parser {
  public parse(
    tokenFiles: TokenFiles
  ): { tokenGroups: TokenGroup[]; keyframes: string } {
    return {
      tokenGroups: this.mapTokenFilesToTokenGroups(tokenFiles),
      keyframes: this.mapTokenFilesToKeyframes(tokenFiles)
    };
  }

  private mapTokenFilesToKeyframes(tokenFiles: TokenFiles): string {
    if (!tokenFiles || !tokenFiles.css) {
      return '';
    }

    return tokenFiles.css
      .map((tokenFile: string) => {
        const parsed = {
          type: 'stylesheet',
          stylesheet: {
            rules: mensch
              .parse(tokenFile, {
                comments: true,
                position: true
              })
              .stylesheet.rules.filter((rule: any) => rule.type === 'keyframes')
          }
        };

        return mensch.stringify(parsed);
      })
      .flat()
      .join('');
  }

  private mapTokenFilesToTokenGroups(tokenFiles: TokenFiles): TokenGroup[] {
    if (!tokenFiles || !tokenFiles.css) {
      return [];
    }

    return tokenFiles.css
      .map((tokenFile: string) => {
        const parsed = mensch.parse(tokenFile, {
          comments: true,
          position: true
        }).stylesheet.rules;

        const tokenGroups = parsed
          .filter(
            (item: any) =>
              item.type === 'comment' && item.text.indexOf('@tokens') > -1
          )
          .map((item: any) => ({
            ...item,
            parsedText: this.parseCommentBlock(item.text)
          }))
          .map((item: any, index: number, items: any[]) =>
            this.mapTokenGroup(item, items[index + 1], parsed)
          );

        return tokenGroups;
      })
      .flat();
  }

  private mapTokenGroup(
    item: any,
    nextItem: any,
    parsedTokenFile: any[]
  ): TokenGroup {
    const presenterTag = item.parsedText.tags.find(
      (t: any) => t.tag === 'presenter'
    );

    return this.addTokensToTokenGroup(
      {
        label: item.parsedText.tags
          .find((t: any) => t.tag === 'tokens')
          .source.replace('@tokens', '')
          .trim(),
        position: {
          start: item.position.start.line,
          end: nextItem ? nextItem.position.start.line - 1 : Infinity
        },
        presenter: presenterTag ? presenterTag.name : undefined,
        tokens: [] as Token[]
      },
      parsedTokenFile
    );
  }

  private addTokensToTokenGroup(
    tokenGroup: TokenGroup,
    parsedTokenFile: any[]
  ): TokenGroup {
    const relevantRules: any = parsedTokenFile
      .filter(item => item.type === 'rule')
      .find(
        item =>
          item.position.start.line >= tokenGroup.position.start &&
          item.position.end.line <= tokenGroup.position.end
      );

    const tokens: Token[] = !relevantRules
      ? []
      : relevantRules.declarations
          .map((declaration: any, index: number, declarations: any[]) => {
            const nextDeclaration = declarations[index + 1];

            return {
              ...declaration,
              description:
                nextDeclaration && nextDeclaration.type === 'comment'
                  ? nextDeclaration.text.replace(/\*/g, '').trim()
                  : ''
            };
          })
          .filter(
            (declaration: any) =>
              declaration.type === 'property' && declaration.name.match(/^--/)
          )
          .map((declaration: any, index: number, declarations: any[]) => {
            const aliases = declarations
              .filter(d => d.value === `var(${declaration.name})`)
              .map(declaration => declaration.name);

            return {
              aliases,
              description: declaration.description,
              key: declaration.name,
              value: declaration.value
            };
          })
          .filter((token: Token) => !token.value.match(/^var\(--.+/));

    return { ...tokenGroup, tokens };
  }

  private parseCommentBlock(string: string): any {
    return parseCommentBlock(`/*${string}*/`)[0];
  }
}
