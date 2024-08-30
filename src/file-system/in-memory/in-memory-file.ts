import { Equalable } from '../../haveSameItems';
import { File } from '../file';
import { Path } from '../path';

export class InMemoryFile implements File, Equalable {
  private readonly _path: Path;

  private readonly _contents: string;

  public constructor(path: Path, contents: string) {
    this._path = path;
    this._contents = contents;
  }

  public get path(): Path {
    return this._path;
  }

  public read(): string {
    return this._contents;
  }

  public equals(other: unknown): boolean {
    if (other instanceof InMemoryFile) {
      return this.path.equals(other.path) && this.read() === other.read();
    } else {
      return false;
    }
  }
}
