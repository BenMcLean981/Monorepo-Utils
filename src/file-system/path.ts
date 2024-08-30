import { Equalable } from '../haveSameItems';

export class Path implements Equalable {
  private readonly _path: string;

  public constructor(path: string) {
    if (getTopLevel(path).trim() === '') {
      this._path = getParentPath(path);
    } else {
      this._path = path;
    }
  }

  public static get root(): Path {
    return new Path('/');
  }

  public get isRoot(): boolean {
    return this._path === '/';
  }

  public get full(): string {
    return this._path;
  }

  public get parent(): Path {
    return new Path(getParentPath(this._path));
  }

  public get name(): string {
    return getTopLevel(this._path);
  }

  public sub(name: string): Path {
    return new Path(`${this.full}/${name}`);
  }

  public toString(): string {
    return this._path;
  }

  public equals(other: unknown): boolean {
    if (other instanceof Path) {
      return this._path === other._path;
    } else {
      return false;
    }
  }
}

export function getParentPath(path: string): string {
  const segments = path.split('/');

  if (segments.length === 2 && path.startsWith('/')) {
    return '/';
  }

  return segments.slice(0, -1).join('/');
}

export function getTopLevel(path: string): string {
  const segments = path.split('/');

  return segments[segments.length - 1];
}
