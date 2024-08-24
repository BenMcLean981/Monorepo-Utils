import { Equalable } from './haveSameItems';
import { PackageJson } from './package-json';
import { TsConfig } from './tsconfig/ts-config';

export class Project implements Equalable {
  private readonly _packageJson: PackageJson;

  private readonly _tsconfig: TsConfig;

  public constructor(packageJson: PackageJson, tsconfig: TsConfig) {
    this._packageJson = packageJson;
    this._tsconfig = tsconfig;
  }

  public get packageJson(): PackageJson {
    return this._packageJson;
  }

  public get tsconfig(): TsConfig {
    return this._tsconfig;
  }

  public equals(other: unknown): boolean {
    if (other instanceof Project) {
      return (
        this._packageJson.equals(other._packageJson) &&
        this._tsconfig.equals(other._tsconfig)
      );
    } else {
      return false;
    }
  }
}
