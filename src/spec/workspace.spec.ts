import { beforeEach, describe, expect, it } from 'vitest';
import { PackageJson } from '../package-json';
import { Project } from '../project';
import { TsConfig } from '../tsconfig/ts-config';
import { Workspace } from '../workspace';

describe('Workspace', () => {
  describe('equals', () => {
    let project1: Project;
    let project2: Project;
    let project3: Project;

    beforeEach(() => {
      project1 = new Project(new PackageJson({ name: '1' }), new TsConfig());
      project2 = new Project(new PackageJson({ name: '2' }), new TsConfig());
      project3 = new Project(new PackageJson({ name: '3' }), new TsConfig());
    });

    it('Returns true for equivalent workspaces.', () => {
      const w1 = new Workspace(project1, [project2, project3]);
      const w2 = new Workspace(project1, [project3, project2]);

      expect(w1.equals(w2)).toBe(true);
    });

    it('Returns false for different roots.', () => {
      const w1 = new Workspace(project1, []);
      const w2 = new Workspace(project2, []);

      expect(w1.equals(w2)).toBe(false);
    });

    it('Returns false for different projects.', () => {
      const w1 = new Workspace(project1, [project2]);
      const w2 = new Workspace(project1, [project3]);

      expect(w1.equals(w2)).toBe(false);
    });
  });
});
