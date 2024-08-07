import { PackageJson } from './package-json';
import { Project } from './project';

export class Workspace {
  private readonly _root: Project;

  private readonly _packages: ReadonlyArray<Project>;

  public constructor(root: Project, packages: ReadonlyArray<Project>) {
    this._root = root;
    this._packages = packages;
  }

  public equals(other: Workspace): boolean {
    return true;
  }
}
