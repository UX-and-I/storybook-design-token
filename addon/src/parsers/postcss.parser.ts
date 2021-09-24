import postcss, { AcceptedPlugin, AtRule, Comment, Declaration, OldPlugin, Plugin } from 'postcss';
import scss from 'postcss-scss';

import { Category, CategoryRange } from '../types/category.types';
import { File } from '../types/config.types';
import { Token, TokenPresenter, TokenSourceType } from '../types/token.types';

export async function parseCssFiles(
  files: File[] = [],
  sourceType: TokenSourceType,
  injectVariables?: boolean
): Promise<{ categories: Category[]; injectionStyles: string }> {
  const nodes = await getNodes(files.filter((file) => file.content));

  const categories = determineCategories(
    nodes.comments,
    nodes.declarations,
    sourceType
  );

  let injectionStyles = nodes?.keyframes.map((k) => k.toString()).join(' ');

  if (injectVariables) {
    injectionStyles =
      injectionStyles +
      `:root {
        ${nodes.declarations
          .map((declaration) => declaration.toString())
          .join(';')}
      }`;
  }

  return { categories, injectionStyles };
}

function determineCategories(
  comments: Comment[],
  declarations: Declaration[],
  sourceType: TokenSourceType
): Category[] {
  const categoryComments = comments.filter((comment) =>
    comment.text.includes('@tokens ')
  );

  return categoryComments.map((comment, index) => {
    const nextComment = categoryComments[index + 1];
    const nameResults = /@tokens (.+)/g.exec(comment.text);
    const presenterResults = /@presenter (.+)/g.exec(comment.text);

    const presenter: TokenPresenter = presenterResults?.[1] as TokenPresenter;

    if (
      presenter &&
      !Object.values(TokenPresenter).includes(
        (presenter || '') as TokenPresenter
      )
    ) {
      throw new Error(`Presenter "${presenter}" is not valid.`);
    }

    const range: CategoryRange = {
      from: {
        column: comment.source?.start?.column || 0,
        line: comment.source?.start?.line || 0
      },
      to: nextComment?.prev()
        ? {
            column: nextComment.prev()?.source?.end?.column || 0,
            line: nextComment.prev()?.source?.end?.line || 0
          }
        : undefined
    };

    const source = comment.source?.input.from || '';

    return {
      name: nameResults?.[1] || '',
      presenter,
      range,
      source,
      tokens: determineTokensForCategory(
        source,
        range,
        declarations,
        comments,
        sourceType,
        presenter
      )
    };
  });
}

function determineTokensForCategory(
  source: string,
  range: CategoryRange,
  declarations: Declaration[],
  comments: Comment[],
  sourceType: TokenSourceType,
  presenter: TokenPresenter
): Token[] {
  const declarationsWithinRange = declarations.filter(
    (declaration) =>
      declaration.source?.input.from === source &&
      (declaration.source?.start?.line || -1) > range.from.line &&
      (!range.to || (declaration.source?.start?.line || -1) <= range.to.line)
  );

  return declarationsWithinRange
    .map((declaration) => {
      const description = comments.find(
        (comment) =>
          comment.source?.input.file === declaration.source?.input.file &&
          comment.source?.start?.line === declaration.source?.end?.line
      );

      const value = determineTokenValue(declaration.value, declarations);
      let presenterToken: TokenPresenter | undefined;

      if (description) {
        const presenterResultsToken = /@presenter (.+)/g.exec(description.text);

        if (presenterResultsToken) {
          presenterToken = presenterResultsToken[1] as TokenPresenter;
          description.text = description.text.replace(
            presenterResultsToken[0] || '',
            ''
          );
        }
      }

      return {
        description: description?.text,
        isAlias: value !== declaration.value,
        name: declaration.prop,
        presenter: presenterToken || presenter,
        rawValue: declaration.value,
        sourceType,
        value
      };
    })
    .slice()
    .reverse()
    .filter(
      (token, index, tokens) =>
        index === tokens.findIndex((t) => t.name === token.name)
    )
    .reverse();
}

function determineTokenValue(
  rawValue: string,
  declarations: Declaration[]
): string {
  rawValue = rawValue.replace(/!default/g, '').replace(/!global/g, '');

  const referencedVariableResult = /^((var\(([a-zA-Z0-9-_]+)\))|(\$([a-zA-Z0-9-_]+))|(\@([a-zA-Z0-9-_]+)))$/.exec(
    rawValue
  );

  const referencedVariable =
    referencedVariableResult?.[3] ||
    referencedVariableResult?.[5] ||
    referencedVariableResult?.[7];

  if (referencedVariable) {
    const value =
      declarations.find(
        (declaration) =>
          declaration.prop === referencedVariable ||
          declaration.prop === `$${referencedVariable}` ||
          declaration.prop === `@${referencedVariable}`
      )?.value || '';

    return determineTokenValue(value, declarations);
  }

  return rawValue;
}

async function getNodes(
  files: File[]
): Promise<{
  comments: Comment[];
  declarations: Declaration[];
  keyframes: AtRule[];
}> {
  const comments: Comment[] = [];
  const declarations: Declaration[] = [];
  const keyframes: AtRule[] = [];

  const plugin: Plugin = {
    postcssPlugin: 'storybook-design-token-parser',
    Once(root) {
      root.walkAtRules((atRule) => {
        if (atRule.name === 'keyframes') {
          keyframes.push(atRule);
          return;
        }

        const variableAtRule = atRule;

        if (variableAtRule.name.endsWith(':')) {
          declarations.push({
            ...variableAtRule,
            prop: `@${variableAtRule.name.substr(
              0,
              variableAtRule.name.length - 1
            )}`,
            value: variableAtRule.params
          } as any);
        }
      });

      root.walkComments((comment) => {
        comments.push(comment);
      });

      root.walkDecls((declaration) => {
        if (
          declaration.prop.startsWith('--') ||
          declaration.prop.startsWith('$')
        ) {
          declarations.push(declaration);
        }
      });
    }
  };

  await Promise.all(
    files.map((file) => {
      const syntax: any = file.filename.endsWith('.scss') ? scss : undefined;

      return postcss([plugin]).process(file.content, {
        from: file.filename,
        syntax
      });
    })
  );

  return { comments, declarations, keyframes };
}
