import { describe, expect, it } from 'vitest';
import { DependencyGraphNode } from '../dependency-graph-node';

describe('DependencyGraphNode', () => {
  describe('equals', () => {
    it('Returns true for equal.', () => {
      const n1 = new DependencyGraphNode('foo', ['a', 'b']);
      const n2 = new DependencyGraphNode('foo', ['a', 'b']);

      expect(n1.equals(n2)).toBe(true);
    });

    it('Returns true for equal.', () => {
      const n1 = new DependencyGraphNode('foo', ['a', 'b']);
      const n2 = new DependencyGraphNode('foo', ['a', 'b']);

      expect(n1.equals(n2)).toBe(true);
    });

    it('Returns false for different names.', () => {
      const n1 = new DependencyGraphNode('foo', ['a', 'b']);
      const n2 = new DependencyGraphNode('bar', ['a', 'b']);

      expect(n1.equals(n2)).toBe(false);
    });

    it('Returns false for different dependencies.', () => {
      const n1 = new DependencyGraphNode('foo', ['a', 'b']);
      const n2 = new DependencyGraphNode('foo', ['a']);

      expect(n1.equals(n2)).toBe(false);
    });

    it('Returns true for same dependencies in different order.', () => {
      const n1 = new DependencyGraphNode('foo', ['a', 'b']);
      const n2 = new DependencyGraphNode('foo', ['b', 'a']);

      expect(n1.equals(n2)).toBe(true);
    });

    it('Returns false for different types.', () => {
      const node = new DependencyGraphNode('foo', ['a', 'b']);

      expect(node.equals('foo')).toBe(false);
    });
  });

  describe('addDependency', () => {
    it('Creates a new node with the dependency.', () => {
      const node = new DependencyGraphNode('foo', ['a', 'b']);

      const actual = node.addDependency('c');
      const expected = new DependencyGraphNode('foo', ['a', 'b', 'c']);

      expect(actual.equals(expected)).toBe(true);
    });

    it('Throws an error for already a dependency.', () => {
      const node = new DependencyGraphNode('foo', ['a', 'b']);

      expect(() => node.addDependency('a')).toThrowError();
    });
  });
});
