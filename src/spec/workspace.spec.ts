import { describe } from 'node:test';
import { expect, it } from 'vitest';
import { Workspace } from '../workspace';
import { Project } from '../project';
import { PackageJson } from '../package-json';
import { TsConfig } from '../tsconfig/ts-config';

describe('Workspace', () => {
  describe('equals', () => {
    it('Returns true for equivalent workspaces.', () => {
      const root = new Project(
        new PackageJson({ name: 'foo' }),
        new TsConfig(),
      );

      const w1 = new Workspace(root, []);
      const w2 = new Workspace(root, []);

      expect(w1.equals(w2)).toBe(true);
    });
  });
});
