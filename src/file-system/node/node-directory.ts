import { Directory } from '../directory';
import { File } from '../file';

import fs from 'node:fs';
import { Path } from '../path';
import { NodeFile } from './node-file';

export class NodeDirectory implements Directory {
  private readonly _path: Path;

  public constructor(path: Path) {
    this._path = path;
  }

  public get path(): Path {
    return this._path;
  }

  public get subDirectories(): ReadonlyArray<Directory> {
    return fs
      .readdirSync(this._path.full, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => new NodeDirectory(this._path.sub(d.name)));
  }

  public get files(): ReadonlyArray<File> {
    return fs
      .readdirSync(this._path.full, { withFileTypes: true })
      .filter((f) => f.isFile())
      .map((f) => new NodeFile(this._path.sub(f.name)));
  }
}
