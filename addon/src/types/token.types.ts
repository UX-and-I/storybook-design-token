export interface Token {
  description?: string;
  isAlias?: boolean;
  name: string;
  categoryName?: string;
  presenter?: TokenPresenter;
  rawValue: string;
  sourceType: TokenSourceType;
  value: string;
}

export enum TokenPresenter {
  ANIMATION = 'Animation',
  BORDER = 'Border',
  BORDER_RADIUS = 'BorderRadius',
  COLOR = 'Color',
  EASING = 'Easing',
  FONT_FAMILY = 'FontFamily',
  FONT_SIZE = 'FontSize',
  FONT_WEIGHT = 'FontWeight',
  GRADIENT = 'Gradient',
  LINE_HEIGHT = 'LineHeight',
  LETTER_SPACING = 'LetterSpacing',
  OPACITY = 'Opacity',
  SHADOW = 'Shadow',
  SPACING = 'Spacing',
  SVG = 'Svg'
}

export enum TokenSourceType {
  CSS = 'CSS',
  LESS = 'Less',
  SCSS = 'SCSS',
  SVG = 'SVG',
  THEO = 'THEO'
}
