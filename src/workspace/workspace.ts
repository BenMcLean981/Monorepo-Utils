import { Equalable, haveSameItems } from '../haveSameItems';
import { Project } from '../project';

export class Workspace implements Equalable {
  private readonly _root: Project;

  private readonly _projects: ReadonlyArray<Project>;

  public constructor(root: Project, projects: ReadonlyArray<Project>) {
    this._root = root;
    this._projects = projects;

    this.validate();
  }

  private validate(): void {
    if (!isWorkspace(this._root)) {
      throw new Error('Root project is not a workspace.');
    }

    if (this._projects.some(isWorkspace)) {
      throw new Error('Cannot have nested workspaces.');
    }

    const names = [
      ...this._projects.map((p) => p.packageJson.name),
      this._root.packageJson.name,
    ];

    names.forEach((n1) => {
      const count = names.filter((n2) => n1 === n2).length;

      if (count !== 1) {
        throw new Error(
          `Package name "${n1}" is duplicated. Package names must be unique.`,
        );
      }
    });
  }

  public get root(): Project {
    return this._root;
  }

  public get projects(): ReadonlyArray<Project> {
    return [...this._projects];
  }

  public updateProject(project: Project): Workspace {
    let numUpdated = 0;

    const updated = this.projects.map((p) => {
      if (p.name === project.name) {
        numUpdated++;

        return project;
      } else {
        return p;
      }
    });

    if (numUpdated === 0) {
      throw new Error('Project not updated.');
    } else if (numUpdated > 1) {
      throw new Error('Two projects updated.');
    }

    return new Workspace(this.root, updated);
  }

  public equals(other: unknown): boolean {
    if (other instanceof Workspace) {
      return (
        this._root.equals(other._root) &&
        haveSameItems(this._projects, other._projects, (p1, p2) =>
          p1.equals(p2),
        )
      );
    } else {
      return false;
    }
  }
}

function isWorkspace(project: Project): boolean {
  return project.packageJson.workspaces.length > 0;
}
