export class Dependency {
  private readonly _name: string;

  private readonly _version: string;

  public constructor(name: string, version: string) {
    this._name = name;
    this._version = version;
  }

  public equals(other: Dependency): boolean {
    return this._name === other._name && this._version === other._version;
  }
}
