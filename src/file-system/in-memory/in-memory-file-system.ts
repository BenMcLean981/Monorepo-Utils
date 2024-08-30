import { FileSystem } from '../file-system';
import { Path } from '../path';
import { InMemoryDirectory } from './in-memory-directory';
import { InMemoryFile } from './in-memory-file';

export class InMemoryFileSystem implements FileSystem {
  private readonly _root = new InMemoryDirectory(Path.root, [], []);

  public exists(path: Path): boolean {
    if (path.isRoot) {
      return true;
    } else if (!this.exists(path.parent)) {
      return false;
    } else {
      const parent = this.getDirectory(path.parent);

      return (
        parent.files.some((f) => f.path.equals(path)) ||
        parent.subDirectories.some((d) => d.path.equals(path))
      );
    }
  }

  public getDirectory(path: Path): InMemoryDirectory {
    if (!this.exists(path)) {
      throw new Error(`Directory "${path}" does not exist.`);
    }

    if (path.isRoot) {
      return this._root;
    } else {
      const parent = this.getDirectory(path.parent);

      const result = parent.subDirectories.find((d) => d.path.equals(path));

      if (result === undefined) {
        throw new Error(`Path "${path}" does not exist.`);
      }

      return result;
    }
  }

  private getOrCreateParentDirectory(path: Path): InMemoryDirectory {
    if (!this.exists(path.parent)) {
      this.createDirectory(path.parent);
    }

    return this.getDirectory(path.parent);
  }

  public createDirectory(path: Path): void {
    const parent = this.getOrCreateParentDirectory(path);

    parent.addDirectory(new InMemoryDirectory(path, [], []));
  }

  public createFile(path: Path, contents: string): void {
    const parent = this.getOrCreateParentDirectory(path);

    parent.addFile(new InMemoryFile(path, contents));
  }

  public getFile(path: Path): InMemoryFile {
    if (!this.exists(path)) {
      throw this.makeFileNotExistsError(path);
    }

    const parent = this.getDirectory(path.parent);

    const result = parent.files.find((f) => f.path.equals(path));

    if (result === undefined) {
      throw this.makeFileNotExistsError(path);
    }

    return result;
  }

  private makeFileNotExistsError(path: Path) {
    return new Error(`File "${path.full}" does not exist.`);
  }
}
