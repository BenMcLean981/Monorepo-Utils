import { FileSystem } from '../file-system';
import { InMemoryDirectory } from './in-memory-directory';
import { InMemoryFile } from './in-memory-file';

export class InMemoryFileSystem implements FileSystem {
  private readonly _root = new InMemoryDirectory('/', [], []);

  public exists(path: string): boolean {
    const parentPath = getParentPath(path);

    if (path === '/') {
      return true;
    } else if (!this.exists(parentPath)) {
      return false;
    } else {
      const parent = this.getDirectory(parentPath);
      const name = getTopLevel(path);

      return (
        parent.files.some((f) => f.name === name) ||
        parent.subDirectories.some((d) => d.name === name)
      );
    }
  }

  public getDirectory(path: string): InMemoryDirectory {
    if (!this.exists(path)) {
      throw new Error(`Directory "${path}" does not exist.`);
    }

    if (path === '/') {
      return this._root;
    } else {
      const parentPath = getParentPath(path);
      const parent = this.getDirectory(parentPath);
      const name = getTopLevel(path);

      const result = parent.subDirectories.find((d) => d.name === name);

      if (result === undefined) {
        throw new Error(`Path "${path}" does not exist.`);
      }

      return result;
    }
  }

  private getOrCreateParentDirectory(path: string): InMemoryDirectory {
    const parentPath = getParentPath(path);

    if (!this.exists(parentPath)) {
      this.createDirectory(parentPath);
    }

    return this.getDirectory(parentPath);
  }

  public createDirectory(path: string): void {
    const parent = this.getOrCreateParentDirectory(path);

    const name = getTopLevel(path);

    parent.addDirectory(new InMemoryDirectory(name, [], []));
  }

  public createFile(path: string, contents: string): void {
    const parent = this.getOrCreateParentDirectory(path);

    const name = getTopLevel(path);

    parent.addFile(new InMemoryFile(name, contents));
  }

  public getFile(path: string): InMemoryFile {
    if (!this.exists(path)) {
      throw this.makeFileNotExistsError(path);
    }

    const parent = this.getDirectory(getParentPath(path));
    const name = getTopLevel(path);

    const result = parent.files.find((f) => f.name === name);

    if (result === undefined) {
      throw this.makeFileNotExistsError(path);
    }

    return result;
  }

  private makeFileNotExistsError(path: string) {
    return new Error(`File "${path}" does not exist.`);
  }
}

function getParentPath(path: string): string {
  const segments = path.split('/');

  if (segments.length === 2 && path.startsWith('/')) {
    return '/';
  }

  return segments.slice(0, -1).join('/');
}

function getTopLevel(path: string): string {
  const segments = path.split('/');

  return segments[segments.length - 1];
}
