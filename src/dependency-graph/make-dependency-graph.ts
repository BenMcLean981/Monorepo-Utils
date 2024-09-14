import { Project } from '../project';
import { Workspace } from '../workspace';
import { DependencyGraph } from './dependency-graph';
import { DependencyGraphNode } from './dependency-graph-node';

export function makeWorkspaceDependencyGraph(
  workspace: Workspace,
): DependencyGraph {
  return makeDependencyGraph(workspace.projects);
}

export function makeDependencyGraph(
  projects: ReadonlyArray<Project>,
): DependencyGraph {
  const nodes = projects.map(makeNode);

  return DependencyGraph.makeGraph(nodes);
}

function makeNode(project: Project): DependencyGraphNode {
  const dependencies = [
    ...project.packageJson.dependencies.map((d) => d.name),
    ...project.packageJson.devDependencies.map((d) => d.name),
  ];

  return new DependencyGraphNode(project.name, dependencies);
}
