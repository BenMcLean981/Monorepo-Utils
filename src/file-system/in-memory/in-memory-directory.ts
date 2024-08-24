import { haveSameItems } from '../../haveSameItems';
import { Directory } from '../directory';
import { File } from '../file';

export class InMemoryDirectory implements Directory {
  private readonly _name: string;

  private readonly _subDirectories: ReadonlyArray<Directory>;

  private readonly _files: ReadonlyArray<File>;

  public constructor(
    name: string,
    subDirectories: ReadonlyArray<Directory>,
    files: ReadonlyArray<File>,
  ) {
    this._name = name;
    this._subDirectories = subDirectories;
    this._files = files;
  }

  public get name(): string {
    return this._name;
  }

  public get subDirectories(): ReadonlyArray<Directory> {
    return this._subDirectories;
  }

  public get files(): ReadonlyArray<File> {
    return this._files;
  }

  public equals(other: InMemoryDirectory): boolean {
    return (
      this.name === other.name &&
      haveSameItems(this.subDirectories, other.subDirectories) &&
      haveSameItems(this.files, other.files)
    );
  }
}
