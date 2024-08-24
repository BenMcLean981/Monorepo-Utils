import { Equalable } from '../../haveSameItems';
import { File } from '../file';

export class InMemoryFile implements File, Equalable {
  private readonly _name: string;

  private readonly _contents: string;

  public constructor(name: string, contents: string) {
    this._name = name;
    this._contents = contents;
  }

  public get name(): string {
    return this._name;
  }

  public read(): string {
    return this._contents;
  }

  public equals(other: unknown): boolean {
    if (other instanceof InMemoryFile) {
      return this.name === other.name && this.read() === other.read();
    } else {
      return false;
    }
  }
}
