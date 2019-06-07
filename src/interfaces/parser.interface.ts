import { TokenFiles } from './token-files.interface';
import { TokenGroup } from './token-group.interface';

export interface Parser {
  parse: (
    tokenFiles: TokenFiles
  ) => { tokenGroups: TokenGroup[]; keyframes: string };
}
