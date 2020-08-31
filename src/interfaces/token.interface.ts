export interface Token {
  aliases?: string[];
  description?: string;
  editable?: boolean;
  key: string;
  value: string;
  originalValue?: string;
  updated?: boolean;
}
