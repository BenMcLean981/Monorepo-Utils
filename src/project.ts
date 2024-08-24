import { PackageJson } from './package-json';
import { TsConfig } from './tsconfig/ts-config';

export class Project {
  private readonly _packageJson: PackageJson;

  private readonly _tsconfig: TsConfig;

  public constructor(packageJson: PackageJson, tsconfig: TsConfig) {
    this._packageJson = packageJson;
    this._tsconfig = tsconfig;
  }

  public equals(other: Project): boolean {
    return (
      this._packageJson.equals(other._packageJson) &&
      this._tsconfig.equals(other._tsconfig)
    );
  }
}
