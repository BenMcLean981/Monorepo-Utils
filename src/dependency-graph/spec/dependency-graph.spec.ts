import { beforeEach, describe, expect, it } from 'vitest';
import { DependencyGraph } from '../dependency-graph';
import { DependencyGraphNode } from '../dependency-graph-node';

describe('DependencyGraph', () => {
  let nodeA: DependencyGraphNode;
  let nodeB: DependencyGraphNode;
  let nodeC: DependencyGraphNode;

  beforeEach(() => {
    nodeA = new DependencyGraphNode('A');
    nodeB = new DependencyGraphNode('B');
    nodeC = new DependencyGraphNode('C');
  });

  describe('makeGraph', () => {
    it('Throws an error for duplicate nodes.', () => {
      expect(() =>
        DependencyGraph.makeGraph([nodeA, nodeB, nodeA]),
      ).toThrowError();
    });
  });

  describe('getNode', () => {
    it('Allows nodes to be gotten.', () => {
      const graph = DependencyGraph.makeGraph([nodeA, nodeB, nodeC]);

      const actual = graph.getNode(nodeA.name);

      expect(actual.equals(nodeA)).toBe(true);
    });

    it("Throws an error if the graph doesn't contain the node.", () => {
      const graph = DependencyGraph.makeGraph([nodeA, nodeB]);

      expect(() => graph.getNode(nodeC.name)).toThrowError();
    });
  });
});
