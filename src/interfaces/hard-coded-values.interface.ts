import { Token } from './token.interface';

export interface HardCodedValues {
  token: Token;
  values: HardCodedValue[];
}

export interface HardCodedValue {
  file: string;
  line: number;
  value: string;
}
