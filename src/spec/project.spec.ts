import { describe, expect, it } from 'vitest';
import { PackageJson } from '../package-json';
import { Project } from '../project';
import { Reference } from '../tsconfig/reference';
import { TsConfig } from '../tsconfig/ts-config';

describe('Project', () => {
  describe('equals', () => {
    it('Returns true for equal projects.', () => {
      const p1 = new Project(
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );
      const p2 = new Project(
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );

      expect(p1.equals(p2)).toBe(true);
    });

    it('Returns false for different packageJsons.', () => {
      const p1 = new Project(
        new PackageJson({ name: 'bar', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );
      const p2 = new Project(
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different tsconfigs.', () => {
      const p1 = new Project(
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );
      const p2 = new Project(
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig({ references: [new Reference('./example')] }),
      );

      expect(p1.equals(p2)).toBe(false);
    });
  });
});
