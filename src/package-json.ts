import { Dependency } from './dependency';
import { haveSameItems } from './utils';

export type ConstructorArgs = {
  name: string;
  dependencies?: ReadonlyArray<Dependency>;
  devDependencies?: ReadonlyArray<Dependency>;
};

export class PackageJson {
  private readonly _name: string;

  private readonly _dependencies: ReadonlyArray<Dependency>;

  private readonly _devDependencies: ReadonlyArray<Dependency>;

  public constructor(args: ConstructorArgs) {
    this._name = args.name;
    this._dependencies = args.dependencies ?? [];
    this._devDependencies = args.devDependencies ?? [];
  }

  public equals(other: PackageJson): boolean {
    const sameDependencies = haveSameItems(
      this._dependencies,
      other._dependencies,
      (d1, d2) => d1.equals(d2),
    );

    const sameDevDependencies = haveSameItems(
      this._devDependencies,
      other._devDependencies,
      (d1, d2) => d1.equals(d2),
    );

    return (
      this._name === other._name && sameDependencies && sameDevDependencies
    );
  }
}
