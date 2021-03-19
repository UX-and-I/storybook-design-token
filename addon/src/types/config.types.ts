export interface Config {
  defaultTab?: string;
  files: File[];
  styleInjection?: string;
}

export interface File {
  content: any;
  filename: string;
}
