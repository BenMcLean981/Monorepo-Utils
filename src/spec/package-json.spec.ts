import { beforeEach, describe, expect, it } from 'vitest';
import { PackageJson } from '../package-json';
import { Dependency } from '../dependency';

describe('PackageJson', () => {
  let dep1: Dependency;
  let dep2: Dependency;
  let dep3: Dependency;

  beforeEach(() => {
    dep1 = new Dependency('dep1', '0.0.0');
    dep2 = new Dependency('dep2', '0.0.0');
    dep3 = new Dependency('dep3', '0.0.0');
  });

  describe('equals', () => {
    it('Returns true for equal.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
      });
      const p2 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
      });

      expect(p1.equals(p2)).toBe(true);
    });

    it('Returns false for different names.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
      });
      const p2 = new PackageJson({
        name: 'bar',
        dependencies: [dep1],
        devDependencies: [dep2],
      });

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different dependencies.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
      });
      const p2 = new PackageJson({
        name: 'foo',
        dependencies: [dep3],
        devDependencies: [dep2],
      });

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different devDependencies.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
      });
      const p2 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep3],
      });

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different additionalData.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        additionalData: { private: 'true' },
      });
      const p2 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        additionalData: { private: 'false' },
      });

      expect(p1.equals(p2)).toBe(false);
    });
  });
});
