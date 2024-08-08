import { PackageJson } from './package-json';
import { TsConfig } from './tsconfig/ts-config';

export class Project {
  private readonly _packageJsonm: PackageJson;

  private readonly _tsconfig: TsConfig;

  public constructor(packageJson: PackageJson, tsconfig: TsConfig) {
    this._packageJsonm = packageJson;
    this._tsconfig = tsconfig;
  }
}
