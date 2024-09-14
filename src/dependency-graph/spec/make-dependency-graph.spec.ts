import { describe, expect, it } from 'vitest';
import { Path } from '../../file-system/path';
import { Dependency, PackageJson } from '../../package-json';
import { Project } from '../../project';
import { TsConfig } from '../../tsconfig/ts-config';
import { DependencyGraphNode } from '../dependency-graph-node';
import { makeDependencyGraph } from '../make-dependency-graph';

describe('makeDependencyGraph', () => {
  it('Makes a dependency graph from a list of projects.', () => {
    const projectA = new Project(
      new Path('/a'),
      new PackageJson({
        name: 'A',
        dependencies: [new Dependency('B', '*')],
        devDependencies: [new Dependency('C', '*')],
      }),
      new TsConfig(),
    );

    const projectB = new Project(
      new Path('/b'),
      new PackageJson({ name: 'B', dependencies: [new Dependency('C', '*')] }),
      new TsConfig(),
    );

    const projectC = new Project(
      new Path('/c'),
      new PackageJson({ name: 'C' }),
      new TsConfig(),
    );

    const graph = makeDependencyGraph([projectA, projectB, projectC]);

    const expectedA = new DependencyGraphNode('A', ['B', 'C']);
    const expectedB = new DependencyGraphNode('B', ['C']);
    const expectedC = new DependencyGraphNode('C');

    expect(graph.getNode('A').equals(expectedA)).toBe(true);
    expect(graph.getNode('B').equals(expectedB)).toBe(true);
    expect(graph.getNode('C').equals(expectedC)).toBe(true);
  });
});
