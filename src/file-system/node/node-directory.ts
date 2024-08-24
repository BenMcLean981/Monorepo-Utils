import { Directory } from '../directory';
import { File } from '../file';
import { getTopLevel } from '../utils';

import fs from 'node:fs';
import path from 'node:path';
import { NodeFile } from './node-file';

export class NodeDirectory implements Directory {
  private readonly _path: string;

  public constructor(path: string) {
    this._path = path;
  }

  public get name(): string {
    return getTopLevel(this._path);
  }

  public get subDirectories(): ReadonlyArray<Directory> {
    return fs
      .readdirSync(this._path, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => new NodeDirectory(path.join(this._path, d.name)));
  }

  public get files(): ReadonlyArray<File> {
    return fs
      .readdirSync(this._path, { withFileTypes: true })
      .filter((d) => d.isFile())
      .map((d) => new NodeFile(path.join(this._path, d.name)));
  }
}
