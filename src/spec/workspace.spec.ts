import { beforeEach, describe, expect, it } from 'vitest';
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
