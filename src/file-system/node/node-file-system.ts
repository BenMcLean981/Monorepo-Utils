import { Directory } from '../directory';
import { File } from '../file';
import { FileSystem } from '../file-system';
import { Path } from '../path';
import { NodeDirectory } from './node-directory';
import { NodeFile } from './node-file';

import fs from 'node:fs';

// TODO: Parity with {InMemoryFIleSystem}
// Same exceptions and behavior are expected.

export class NodeFileSystem implements FileSystem {
  public exists(path: Path): boolean {
    return fs.existsSync(path.full);
  }

  public createDirectory(path: Path): void {
    fs.mkdirSync(path.full);
  }

  public writeFile(path: Path, contents: string): void {
    fs.writeFileSync(path.full, contents);
  }

  public getDirectory(path: Path): Directory {
    return new NodeDirectory(path);
  }

  public getFile(path: Path): File {
    return new NodeFile(path);
  }
}
