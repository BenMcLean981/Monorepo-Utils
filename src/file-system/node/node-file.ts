import fs from 'node:fs';
import { File } from '../file';
import { Path } from '../path';

export class NodeFile implements File {
  private readonly _path: Path;

  public constructor(path: Path) {
    this._path = path;
  }

  public get path(): Path {
    return this._path;
  }

  public read(): string {
    return fs.readFileSync(this._path.full, 'utf8');
  }
}
