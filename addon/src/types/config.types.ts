import { PresenterMapType } from "../components/TokenPreview";

export interface Config {
  showSearch?: boolean;
  defaultTab?: string;
  styleInjection?: string;
  pageSize?: number;
  presenters?: PresenterMapType;
  tabs?: string[];
}

export interface File {
  content: any;
  filename: string;
}
