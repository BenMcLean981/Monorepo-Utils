import { haveSameItems } from './haveSameItems';
import { Project } from './project';

export class Workspace {
  private readonly _root: Project;

  private readonly _projects: ReadonlyArray<Project>;

  public constructor(root: Project, projects: ReadonlyArray<Project>) {
    this._root = root;
    this._projects = projects;
  }

  public equals(other: Workspace): boolean {
    return (
      this._root.equals(other._root) &&
      haveSameItems(this._projects, other._projects, (p1, p2) => p1.equals(p2))
    );
  }
}
