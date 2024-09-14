import path from 'node:path';
import { Path } from './file-system/path';
import { Equalable } from './haveSameItems';
import { Dependency, PackageJson } from './package-json';
import { Reference } from './tsconfig/reference';
import { TsConfig } from './tsconfig/ts-config';

export class Project implements Equalable {
  private readonly _path: Path;

  private readonly _packageJson: PackageJson;

  private readonly _tsconfig: TsConfig;

  public constructor(path: Path, packageJson: PackageJson, tsconfig: TsConfig) {
    this._path = path;
    this._packageJson = packageJson;
    this._tsconfig = tsconfig;
  }

  public get path(): Path {
    return this._path;
  }

  public get name(): string {
    return this._packageJson.name;
  }

  public get packageJson(): PackageJson {
    return this._packageJson;
  }

  public get tsconfig(): TsConfig {
    return this._tsconfig;
  }

  public addDependency(
    project: Project,
    version: string,
    dev: boolean,
  ): Project {
    const relativePath = path.relative(this.path.full, project.path.full);

    return new Project(
      this.path,
      this.packageJson.addDependency(
        new Dependency(project.name, version),
        dev,
      ),
      this.tsconfig.addReference(new Reference(relativePath)),
    );
  }

  public equals(other: unknown): boolean {
    if (other instanceof Project) {
      return (
        this._path.equals(other._path) &&
        this._packageJson.equals(other._packageJson) &&
        this._tsconfig.equals(other._tsconfig)
      );
    } else {
      return false;
    }
  }
}
