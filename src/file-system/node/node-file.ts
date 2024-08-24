import fs from 'node:fs';
import { File } from '../file';
import { getTopLevel } from '../utils';

export class NodeFile implements File {
  private readonly _path: string;

  public constructor(path: string) {
    this._path = path;
  }

  public get name(): string {
    return getTopLevel(this._path);
  }

  public read(): string {
    return fs.readFileSync(this._path, 'utf8');
  }
}
