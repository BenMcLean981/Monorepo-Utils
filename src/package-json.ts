import { isEqual } from 'lodash';
import { Dependency } from './dependency';
import { Snapshot } from './serialization';
import { haveSameItems } from './utils';

export type ConstructorArgs = {
  name: string;
  dependencies?: ReadonlyArray<Dependency>;
  devDependencies?: ReadonlyArray<Dependency>;
  additionalData?: Snapshot;
};

export class PackageJson {
  private readonly _name: string;

  private readonly _dependencies: ReadonlyArray<Dependency>;

  private readonly _devDependencies: ReadonlyArray<Dependency>;

  private readonly _additionalData: Snapshot;

  public constructor(args: ConstructorArgs) {
    this._name = args.name;
    this._dependencies = args.dependencies ?? [];
    this._devDependencies = args.devDependencies ?? [];
    this._additionalData = args.additionalData ?? {};
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
      this._name === other._name &&
      sameDependencies &&
      sameDevDependencies &&
      isEqual(this._additionalData, other._additionalData)
    );
  }
}
