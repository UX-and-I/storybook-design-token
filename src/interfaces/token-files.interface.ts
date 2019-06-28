export interface TokenFiles {
  css?: TokenFile[];
  scss?: TokenFile[];
  svgIcons?: TokenFile[];
}

export interface TokenFile {
  content: string;
  filename: string;
}
