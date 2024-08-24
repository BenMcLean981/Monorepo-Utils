import { Equalable, haveSameItems } from '../../haveSameItems';
import { Directory } from '../directory';
import { InMemoryFile } from './in-memory-file';

export class InMemoryDirectory implements Directory, Equalable {
  private readonly _name: string;

  private readonly _subDirectories: Array<InMemoryDirectory>;

  private readonly _files: Array<InMemoryFile>;

  public constructor(
    name: string,
    subDirectories: ReadonlyArray<InMemoryDirectory>,
    files: ReadonlyArray<InMemoryFile>,
  ) {
    this._name = name;
    this._subDirectories = [...subDirectories];
    this._files = [...files];
  }

  public get name(): string {
    return this._name;
  }

  public get subDirectories(): ReadonlyArray<InMemoryDirectory> {
    return this._subDirectories;
  }

  public get files(): ReadonlyArray<InMemoryFile> {
    return this._files;
  }

  public addDirectory(directory: InMemoryDirectory): void {
    this._subDirectories.push(directory);
  }

  public addFile(file: InMemoryFile): void {
    this._files.push(file);
  }

  public equals(other: unknown): boolean {
    if (other instanceof InMemoryDirectory) {
      return (
        this.name === other.name &&
        haveSameItems(this.subDirectories, other.subDirectories) &&
        haveSameItems(this.files, other.files)
      );
    } else {
      return false;
    }
  }
}
