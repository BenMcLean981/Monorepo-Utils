import { File } from './file';

export interface Directory {
  readonly name: string;

  readonly subDirectories: ReadonlyArray<Directory>;

  readonly files: ReadonlyArray<File>;
}
