import { Directory } from '../directory';
import { File } from '../file';
import { FileSystem } from '../file-system';
import { NodeDirectory } from './node-directory';
import { NodeFile } from './node-file';

import fs from 'node:fs';

export class NodeFileSystem implements FileSystem {
  public exists(path: string): boolean {
    return fs.existsSync(path);
  }

  public createDirectory(path: string): void {
    fs.mkdirSync(path);
  }

  public createFile(path: string, contents: string): void {
    fs.writeFileSync(path, contents);
  }

  public getDirectory(path: string): Directory {
    return new NodeDirectory(path);
  }

  public getFile(path: string): File {
    return new NodeFile(path);
  }
}
