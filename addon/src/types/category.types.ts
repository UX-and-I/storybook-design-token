import { Token, TokenPresenter } from "./token.types";

export interface Category {
  name: string;
  presenter?: TokenPresenter;
  range?: CategoryRange;
  source?: string;
  tokens: Token[];
}

export interface CategoryRange {
  from: {
    column: number;
    line: number;
  };
  to?: {
    column: number;
    line: number;
  };
}
