export interface Config {
  showSearch?: boolean;
  defaultTab?: string;
  styleInjection?: string;
  pageSize?: number;
}

export interface File {
  content: any;
  filename: string;
}
