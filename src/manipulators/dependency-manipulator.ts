import { Project } from '../project';
import { Workspace } from '../workspace';

export class DependencyManipulator {
  private readonly _workspace: Workspace;

  public constructor(workspace: Workspace) {
    this._workspace = workspace;
  }

  public get workspace(): Workspace {
    return this._workspace;
  }

  public addDependency(
    from: string,
    to: string,
    version: string = '*',
    dev: boolean = false,
  ): DependencyManipulator {
    const fromProject = this.getProject(from);
    const toProject = this.getProject(to);

    const newFrom = fromProject.addDependency(toProject, version, dev);
    const updatedWorkspace = this._workspace.updateProject(newFrom);

    // TODO: Check for circular.

    return new DependencyManipulator(updatedWorkspace);
  }

  private getProject(name: string): Project {
    const result = this._workspace.projects.find((p) => p.name === name);

    if (result === undefined) {
      throw new Error(`Project "${name}" does not exist.`);
    }

    return result;
  }
}
