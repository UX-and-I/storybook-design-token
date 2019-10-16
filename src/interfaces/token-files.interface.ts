export interface TokenFiles {
	css?: TokenFile[];
	less?: TokenFile[];
	scss?: TokenFile[];
	svgIcons?: TokenFile[];
  }

  export interface TokenFile {
	content: string;
	filename: string;
  }
