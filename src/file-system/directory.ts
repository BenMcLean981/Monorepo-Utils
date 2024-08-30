import { File } from './file';
import { Path } from './path';

export interface Directory {
  readonly path: Path;

  readonly subDirectories: ReadonlyArray<Directory>;

  readonly files: ReadonlyArray<File>;
}
