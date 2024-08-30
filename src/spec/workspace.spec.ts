import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryFileSystem } from '../file-system/in-memory/in-memory-file-system';
import { Path } from '../file-system/path';
import { PackageJson } from '../package-json';
import { Project } from '../project';
import { TsConfig } from '../tsconfig/ts-config';
import { Workspace } from '../workspace';

describe('Workspace', () => {
  it('Throws an error if root is not a workspace.', () => {
    const root = new Project(new PackageJson({ name: '1' }), new TsConfig());

    expect(() => new Workspace(root, [])).toThrowError();
  });

  it('Throws an error if any project is also a workspace.', () => {
    const root = new Project(
      new PackageJson({ name: '1', workspaces: ['packages/*'] }),
      new TsConfig(),
    );

    const project = new Project(
      new PackageJson({ name: '2', workspaces: ['packages/*'] }),
      new TsConfig(),
    );

    expect(() => new Workspace(root, [project])).toThrowError();
  });

  it('Throws an error if root name is duplicated.', () => {
    const root = new Project(
      new PackageJson({ name: '1', workspaces: ['packages/*'] }),
      new TsConfig(),
    );

    const project = new Project(new PackageJson({ name: '1' }), new TsConfig());

    expect(() => new Workspace(root, [project])).toThrowError();
  });

  it('Throws an error if project name is duplicated.', () => {
    const root = new Project(
      new PackageJson({ name: '1', workspaces: ['packages/*'] }),
      new TsConfig(),
    );

    const project1 = new Project(
      new PackageJson({ name: '2' }),
      new TsConfig(),
    );

    const project2 = new Project(
      new PackageJson({ name: '2' }),
      new TsConfig(),
    );

    expect(() => new Workspace(root, [project1, project2])).toThrowError();
  });

  describe('parse', () => {
    it('Parses the projects.', () => {
      const fs = new InMemoryFileSystem();

      const root = new Project(
        new PackageJson({ name: 'root', workspaces: ['packages/*'] }),
        new TsConfig(),
      );

      const package1 = new Project(
        new PackageJson({ name: 'package1' }),
        new TsConfig(),
      );
      const package2 = new Project(
        new PackageJson({ name: 'package2' }),
        new TsConfig(),
      );

      fs.createDirectory(new Path('/foo/bar/'));

      fs.createFile(
        new Path('/foo/bar/package.json'),
        root.packageJson.format(),
      );
      fs.createFile(new Path('/foo/bar/tsconfig.json'), root.tsconfig.format());

      fs.createFile(
        new Path('/foo/bar/packages/package1/package.json'),
        package1.packageJson.format(),
      );
      fs.createFile(
        new Path('/foo/bar/packages/package1/tsconfig.json'),
        package1.tsconfig.format(),
      );

      fs.createFile(
        new Path('/foo/bar/packages/package2/package.json'),
        package2.packageJson.format(),
      );
      fs.createFile(
        new Path('/foo/bar/packages/package2/tsconfig.json'),
        package2.tsconfig.format(),
      );

      const actual = Workspace.parse('/foo/bar', fs);
      const expected = new Workspace(root, [package1, package2]);

      expect(actual.equals(expected)).toBe(true);
    });
  });

  describe('equals', () => {
    let root1: Project;
    let root2: Project;

    let project1: Project;
    let project2: Project;

    beforeEach(() => {
      root1 = new Project(
        new PackageJson({ name: 'r1', workspaces: ['packages/*'] }),
        new TsConfig(),
      );
      root2 = new Project(
        new PackageJson({ name: 'r2', workspaces: ['packages/*'] }),
        new TsConfig(),
      );

      project1 = new Project(new PackageJson({ name: '1' }), new TsConfig());
      project2 = new Project(new PackageJson({ name: '2' }), new TsConfig());
    });

    it('Returns true for equivalent workspaces.', () => {
      const w1 = new Workspace(root1, [project1, project2]);
      const w2 = new Workspace(root1, [project2, project1]);

      expect(w1.equals(w2)).toBe(true);
    });

    it('Returns false for different roots.', () => {
      const w1 = new Workspace(root1, []);
      const w2 = new Workspace(root2, []);

      expect(w1.equals(w2)).toBe(false);
    });

    it('Returns false for different projects.', () => {
      const w1 = new Workspace(root1, [project1]);
      const w2 = new Workspace(root1, [project2]);

      expect(w1.equals(w2)).toBe(false);
    });

    it('Returns false for a different type.', () => {
      const w = new Workspace(root1, [project1]);

      expect(w.equals(undefined)).toBe(false);
    });
  });
});
