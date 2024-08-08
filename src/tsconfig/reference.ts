export class Reference {
  private readonly _path: string;

  public constructor(path: string) {
    this._path = path;
  }

  public get path(): string {
    return this._path;
  }

  equals(other: Reference): boolean {
    return this._path === other._path;
  }
}
