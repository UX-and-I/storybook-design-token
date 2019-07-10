import { HardCodedValues } from '../interfaces/hard-coded-values.interface';
import { Parser } from '../interfaces/parser.interface';
import { TokenFiles } from '../interfaces/token-files.interface';
import { TokenGroup } from '../interfaces/token-group.interface';
import { Token } from '../interfaces/token.interface';

const parseCommentBlock = require('comment-parser/parser.js');
const gonzales = require('gonzales-pe');

export class ScssParser implements Parser {
  public parse(
    tokenFiles: TokenFiles
  ): {
    hardCodedValues: HardCodedValues[];
    tokenGroups: TokenGroup[];
    keyframes: string;
  } {
    const tokenGroups = this.mapTokenFilesToTokenGroups(tokenFiles);

    return {
      hardCodedValues: this.mapTokenFilesToHardCodedValues(
        tokenFiles,
        tokenGroups
      ),
      keyframes: this.mapTokenFilesToKeyframes(tokenFiles),
      tokenGroups: this.mapTokenFilesToTokenGroups(tokenFiles)
    };
  }

  private mapTokenFilesToHardCodedValues(
    tokenFiles: TokenFiles,
    tokenGroups: TokenGroup[]
  ): HardCodedValues[] {
    const hardCodedValues = [];
    const tokens = tokenGroups.map(tokenGroup => tokenGroup.tokens).flat();

    tokenFiles.scss.forEach(tokenFile => {
      const parsed = gonzales.parse(tokenFile.content, { syntax: 'scss' });

      parsed.traverseByType('block', block => {
        block.forEach('declaration', declaration => {
          const value = declaration.first('value');

          if (!value.is('variable')) {
            hardCodedValues.push({
              file: tokenFile.filename,
              line: value.start.line,
              value: this.mapPropertyValue(value)
            });
          }
        });
      });
    });

    // TODO: find tokens inside complex values
    return tokens
      .map(token => ({
        token,
        values: hardCodedValues.filter(value => value.value === token.value)
      }))
      .filter(item => item.values.length > 0);
  }

  private mapTokenFilesToKeyframes(tokenFiles: TokenFiles): string {
    if (!tokenFiles || !tokenFiles.scss) {
      return '';
    }

    return tokenFiles.scss
      .map(tokenFile => {
        const parsed = gonzales.parse(tokenFile.content, { syntax: 'scss' });

        return parsed.content
          .filter((item: any) => item.type === 'atrule')
          .filter((item: any) =>
            item.content.find(
              (node: any) =>
                node.type === 'atkeyword' &&
                node.content.find((n: any) => n.content === 'keyframes')
            )
          );
      })
      .flat()
      .join('');
  }

  private mapTokenFilesToTokenGroups(tokenFiles: TokenFiles): TokenGroup[] {
    if (!tokenFiles || !tokenFiles.scss) {
      return [];
    }

    return tokenFiles.scss
      .map(tokenFile => {
        const parsed = gonzales.parse(tokenFile.content, { syntax: 'scss' });

        const tokenGroups: TokenGroup[] = parsed.content
          .filter(
            (item: any) =>
              item.type === 'multilineComment' &&
              item.content.indexOf('@tokens') > -1
          )
          .map((item: any) => ({
            ...item,
            parsedText: this.parseCommentBlock(item.content)
          }))
          .map((item: any, index: number, items: any[]) =>
            this.mapTokenGroup(item, items[index + 1], parsed.content)
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
          start: item.start.line,
          end: nextItem ? nextItem.start.line - 1 : Infinity
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
      .filter(item => item.type === 'declaration')
      .filter(
        item =>
          item.start.line >= tokenGroup.position.start &&
          item.end.line <= tokenGroup.position.end
      );

    const allAliases = parsedTokenFile
      .filter(
        (node: any) =>
          node.is('declaration') &&
          node.contains('value') &&
          node.first('value').contains('variable')
      )
      .map((node: any) => ({
        alias: node
          .first('property')
          .first('variable')
          .first('ident').content,
        source: node
          .first('value')
          .first('variable')
          .first('ident').content
      }));

    const allComments = parsedTokenFile.filter(
      (node: any) => node.is('singlelineComment') || node.is('multilineComment')
    );

    const tokens: Token[] = !relevantRules
      ? []
      : relevantRules
          .filter(
            (declaration: any) =>
              declaration.contains('property') &&
              declaration.contains('value') &&
              !declaration.first('value').contains('variable')
          )
          .map((declaration: any) => {
            const key = declaration.first('property').first('variable').content;
            const aliases = allAliases
              .filter(alias => alias.source === key[0].content)
              .map(alias => '$' + alias.alias);
            const description = allComments.find(
              c =>
                c.start.line === declaration.start.line &&
                c.end.line === declaration.end.line
            );

            return {
              aliases,
              description: description ? description.content : '',
              key: '$' + key,
              value: this.mapPropertyValue(declaration.first('value'))
            };
          });

    return { ...tokenGroup, tokens };
  }

  private mapPropertyValue(value: any): string {
    const rawValue = this.reducePropertyValues(value);

    if (value.contains('color')) {
      return `#${rawValue}`;
    }

    return rawValue;
  }

  private reducePropertyValues(value: any, reduced = ''): string {
    return value.content
      .reduce((v: string, node: any, index: number, list: any) => {
        if (typeof node.content !== 'string') {
          return this.reducePropertyValues(node, v);
        }

        if (value.type === 'function') {
          return `${v}${node.content}(`;
        }

        if (value.type === 'arguments' && index === list.length - 1) {
          return `${v}${node.content})`;
        }

        return `${v}${node.content}`;
      }, reduced)
      .trim();
  }

  private parseCommentBlock(string: string): any {
    return parseCommentBlock(`/*${string}*/`)[0];
  }
}
