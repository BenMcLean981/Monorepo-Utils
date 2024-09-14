import { describe, expect, it } from 'vitest';
import { Path } from '../file-system/path';
import { Dependency, PackageJson } from '../package-json';
import { Project } from '../project';
import { Reference } from '../tsconfig/reference';
import { TsConfig } from '../tsconfig/ts-config';

describe('Project', () => {
  describe('equals', () => {
    it('Returns true for equal projects.', () => {
      const p1 = new Project(
        new Path('/example/foo'),
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );
      const p2 = new Project(
        new Path('/example/foo'),
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );

      expect(p1.equals(p2)).toBe(true);
    });

    it('Returns false for different paths.', () => {
      const p1 = new Project(
        new Path('/example/bar'),
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );
      const p2 = new Project(
        new Path('/example/foo'),
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different packageJsons.', () => {
      const p1 = new Project(
        new Path('/example/foo'),
        new PackageJson({ name: 'bar', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );
      const p2 = new Project(
        new Path('/example/foo'),
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different tsconfigs.', () => {
      const p1 = new Project(
        new Path('/example/foo'),
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );
      const p2 = new Project(
        new Path('/example/foo'),
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig({ references: [new Reference('./example')] }),
      );

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for a different type.', () => {
      const p = new Project(
        new Path('/example/foo'),
        new PackageJson({ name: 'foo', dependencies: [], devDependencies: [] }),
        new TsConfig(),
      );

      expect(p.equals(undefined)).toBe(false);
    });
  });

  describe('addDependency', () => {
    it('Adds a dependency.', () => {
      const packageJson = new PackageJson({
        name: 'project1',
        dependencies: [new Dependency('example', '1.0.0')],
        devDependencies: [new Dependency('example-2', '1.0.0')],
        additionalData: { num: 5 },
      });

      const project = new Project(
        new Path('/foo/bar/com/project1'),
        packageJson,
        new TsConfig({
          references: [
            new Reference('../example'),
            new Reference('../example-2'),
          ],
          additionalData: { num: 6 },
        }),
      );

      const target = new Project(
        new Path('/foo/bar/com/project2'),
        new PackageJson({ name: 'project2' }),
        new TsConfig({}),
      );

      const actual = project.addDependency(target, '*3');

      const expected = new Project(
        new Path('/foo/bar/com/project1'),
        new PackageJson({
          name: 'project1',
          dependencies: [
            new Dependency('example', '1.0.0'),
            new Dependency('project2', '*3'),
          ],
          devDependencies: [new Dependency('example-2', '1.0.0')],
          additionalData: { num: 5 },
        }),
        new TsConfig({
          references: [
            new Reference('../example'),
            new Reference('../example-2'),
            new Reference('../project2'),
          ],
          additionalData: { num: 6 },
        }),
      );

      expect(actual.equals(expected)).toBe(true);
    });

    it('Adds a devDependency.', () => {
      const packageJson = new PackageJson({
        name: 'project1',
        dependencies: [new Dependency('example', '1.0.0')],
        devDependencies: [new Dependency('example-2', '1.0.0')],
        additionalData: { num: 5 },
      });

      const project = new Project(
        new Path('/foo/bar/com/project1'),
        packageJson,
        new TsConfig({
          references: [
            new Reference('../example'),
            new Reference('../example-2'),
          ],
          additionalData: { num: 6 },
        }),
      );

      const target = new Project(
        new Path('/foo/bar/com/project2'),
        new PackageJson({ name: 'project2' }),
        new TsConfig({}),
      );

      const actual = project.addDevDependency(target, '*3');

      const expected = new Project(
        new Path('/foo/bar/com/project1'),
        new PackageJson({
          name: 'project1',
          dependencies: [new Dependency('example', '1.0.0')],
          devDependencies: [
            new Dependency('example-2', '1.0.0'),
            new Dependency('project2', '*3'),
          ],
          additionalData: { num: 5 },
        }),
        new TsConfig({
          references: [
            new Reference('../example'),
            new Reference('../example-2'),
            new Reference('../project2'),
          ],
          additionalData: { num: 6 },
        }),
      );

      expect(actual.equals(expected)).toBe(true);
    });
  });
});
