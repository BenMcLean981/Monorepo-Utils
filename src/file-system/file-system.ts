import { Directory } from './directory';
import { File } from './file';
import { Path } from './path';

export interface FileSystem {
  exists(path: Path): boolean;

  createDirectory(path: Path): void;

  writeFile(path: Path, contents: string): void;

  getDirectory(path: Path): Directory;

  getFile(path: Path): File;
}
