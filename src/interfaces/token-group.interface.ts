import { Token } from './token.interface';

export interface TokenGroup {
  label: string;
  position?: { start: number; end?: number };
  presenter: string;
  tokens: Token[];
}
