import { Directory } from './directory';
import { File } from './file';

export interface FileSystem {
  exists(path: string): boolean;

  createDirectory(path: string): void;

  createFile(path: string, contents: string): void;

  getDirectory(path: string): Directory;

  getFile(path: string): File;
}
