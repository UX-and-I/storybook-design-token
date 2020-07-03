import { HardCodedValues } from '../interfaces/hard-coded-values.interface';
import { Parser } from '../interfaces/parser.interface';
import { TokenFiles } from '../interfaces/token-files.interface';
import { TokenGroup } from '../interfaces/token-group.interface';
import { Token } from '../interfaces/token.interface';
import { parse as parseCommentBlock } from './comment-parser';

const gonzales = require('gonzales-pe');

export class LessParser implements Parser {
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
    if (!tokenFiles.less) {
      return [];
    }

    const hardCodedValues = [];
    const tokens = tokenGroups.map((tokenGroup) => tokenGroup.tokens).flat();

    tokenFiles.less.forEach((tokenFile) => {
      const parsed = gonzales.parse(tokenFile.content, { syntax: 'less' });

      parsed.traverseByType('block', (block) => {
        block.forEach('declaration', (declaration) => {
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

    return tokens
      .map((token) => ({
        token,
        values: hardCodedValues.filter(
          (value) => value.value && value.value.indexOf(token.value) > -1
        )
      }))
      .filter((item) => item.values.length > 0);
  }

  private mapTokenFilesToKeyframes(tokenFiles: TokenFiles): string {
    if (!tokenFiles || !tokenFiles.less) {
      return '';
    }

    return tokenFiles.less
      .map((tokenFile) => {
        const parsed = gonzales.parse(tokenFile.content, { syntax: 'less' });

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
    if (!tokenFiles || !tokenFiles.less) {
      return [];
    }

    const parsedTokenFiles: any[] = tokenFiles.less.map((tokenFile) =>
      gonzales.parse(tokenFile.content, { syntax: 'less' })
    );

    return parsedTokenFiles
      .map((tokenFile) => {
        const tokenGroups: TokenGroup[] = tokenFile.content
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
            this.mapTokenGroup(
              item,
              items[index + 1],
              tokenFile.content,
              parsedTokenFiles.map((tokenFile) => tokenFile.content)
            )
          );

        return tokenGroups;
      })
      .flat();
  }

  private mapTokenGroup(
    item: any,
    nextItem: any,
    parsedTokenFile: any[],
    parsedTokenFiles: any[]
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
      parsedTokenFile,
      parsedTokenFiles
    );
  }

  private addTokensToTokenGroup(
    tokenGroup: TokenGroup,
    parsedTokenFile: any[],
    parsedTokenFiles: any[]
  ): TokenGroup {
    const relevantRules: any = parsedTokenFile
      .filter((item) => item.type === 'declaration')
      .filter(
        (item) =>
          item.start.line >= tokenGroup.position.start &&
          item.end.line <= tokenGroup.position.end
      );

    const allAliases = parsedTokenFiles
      .map((parsedTokenFile) =>
        parsedTokenFile
          .filter(
            (node: any) =>
              node.is('declaration') &&
              node.contains('value') &&
              node.first('value').contains('variable')
          )
          .map((node: any) => ({
            alias: node.first('property').first('variable').first('ident')
              .content,
            source: node.first('value').first('variable').first('ident').content
          }))
      )
      .flat();

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
              .filter((alias) => alias.source === key[0].content)
              .map((alias) => '@' + alias.alias);
            const description = allComments.find(
              (c) =>
                c.start.line === declaration.start.line &&
                c.end.line === declaration.end.line
            );

            return {
              aliases,
              description: description ? description.content : '',
              editable: false,
              key: '@' + key,
              value: this.mapPropertyValue(declaration.first('value'))
            };
          });

    return { ...tokenGroup, tokens };
  }

  private mapPropertyValue(value: any): string {
    return this.reducePropertyValues(value);
  }

  private reducePropertyValues(value: any, reduced = ''): string {
    return value.content
      .reduce((v: string, node: any, index: number, list: any) => {
        if (typeof node.content === 'string') {
          const type = value.type === 'percentage' ? value.type : node.type;
          node.content = this.addValueUnit(node.content, type);
        }

        if (value.type === 'function' && index > 0) {
          return v;
        }

        if (typeof node.content !== 'string') {
          return this.reducePropertyValues(node, v);
        }

        if (value.type === 'function') {
          return `${v}${node.content}(${this.reducePropertyValues(
            list[index + 1]
          )})`;
        }

        return `${v}${node.content}`;
      }, reduced)
      .trim();
  }

  private addValueUnit(value: string, type: string): string {
    if (type === 'color') {
      return `#${value}`;
    }

    if (type === 'percentage') {
      return `${value}%`;
    }

    return value;
  }

  private parseCommentBlock(string: string): any {
    return parseCommentBlock(`/*${string}*/`)[0];
  }
}
