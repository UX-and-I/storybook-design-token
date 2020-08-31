import { TokenGroup } from '../interfaces/token-group.interface';

export const cssVariableRegex = /var\((--[^)]*)\)/;
export const scssVariableRegex = /(#{)?(\$[^\s,\);}{]*)}?/;
export const lessVariableRegex = /@([^\s,\);]*)/;

export const translateKey = (key: string): string => {
  const cssKey = key.match(cssVariableRegex);
  if (cssKey) return cssKey[1];

  const scssInterpolation = key.match(scssVariableRegex);
  if (scssInterpolation) return scssInterpolation[2];

  return key;
}

export const translateValue = (variable: string, tokenCatalog: TokenGroup[]): string => {
  let value = '';
  const variableKey = translateKey(variable);

  tokenCatalog.map((category: TokenGroup) => {
    if (category.tokens) {
      const token = category.tokens.filter((token) => {
        return token.key === variableKey
          || (token.aliases && token.aliases.indexOf(variableKey) > -1)
      });
      if (token.length) {
        value = parseVariables(token[0].value, tokenCatalog);
        return;
      }
    }
  });

  return value;
};

export const detectVariables = (value: string, includeCssVars = true): string[] => {
  const scssRegex = new RegExp(scssVariableRegex, 'g');
  const lessRegex = new RegExp(lessVariableRegex, 'g');

  const scssVariables = value.match(scssRegex) || [];
  const lessVariables = value.match(lessRegex) || [];

  if (includeCssVars) {
    const cssRegex = new RegExp(cssVariableRegex, 'g');
    const cssVariables = value.match(cssRegex) || [];
    return [ ...cssVariables, ...scssVariables, ...lessVariables ];
  }

  return [ ...scssVariables, ...lessVariables ];
};

export const parseVariables = (value: string, tokenCatalog: TokenGroup[], includeCssVars = true): string => {
  let translatedValue = value;
  const variables = detectVariables(translatedValue, includeCssVars);
  const processedVariables = [];

  if (variables.length > 0) {
    variables.forEach((variable) => {
      const escapedVariable = variable
        .replace('(', '\\(')
        .replace(')', '\\)')
        .replace('$', '\\$');
      if (processedVariables.indexOf(variable) === -1) {
        translatedValue = translatedValue.replace(
          new RegExp(escapedVariable, 'g'),
          translateValue(variable, tokenCatalog)
        );
        processedVariables.push(variable);
      }
    });
  }

  return translatedValue;
};