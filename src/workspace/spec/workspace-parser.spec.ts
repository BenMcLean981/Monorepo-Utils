import { describe, expect, it } from 'vitest';
import { InMemoryFileSystem } from '../../file-system/in-memory/in-memory-file-system';
import { Path } from '../../file-system/path';
import { PackageJson } from '../../package-json';
import { Project } from '../../project';
import { TsConfig } from '../../tsconfig/ts-config';
import { Workspace } from '../workspace';
import { parseWorkspace } from '../workspace-parser';

describe('parseWorkspace', () => {
  it('Parses the projects.', () => {
    const fs = new InMemoryFileSystem();

    const root = new Project(
      new Path('/foo/bar'),
      new PackageJson({ name: 'root', workspaces: ['packages/*'] }),
      new TsConfig(),
    );

    const package1 = new Project(
      new Path('/foo/bar/packages/package1'),
      new PackageJson({ name: 'package1' }),
      new TsConfig(),
    );
    const package2 = new Project(
      new Path('/foo/bar/packages/package2'),
      new PackageJson({ name: 'package2' }),
      new TsConfig(),
    );

    fs.createDirectory(root.path);

    fs.writeFile(root.path.sub('package.json'), root.packageJson.format());
    fs.writeFile(root.path.sub('tsconfig.json'), root.tsconfig.format());

    fs.writeFile(
      package1.path.sub('package.json'),
      package1.packageJson.format(),
    );
    fs.writeFile(
      package1.path.sub('tsconfig.json'),
      package1.tsconfig.format(),
    );

    fs.writeFile(
      package2.path.sub('package.json'),
      package2.packageJson.format(),
    );
    fs.writeFile(
      package2.path.sub('tsconfig.json'),
      package2.tsconfig.format(),
    );

    const actual = parseWorkspace('/foo/bar', fs);
    const expected = new Workspace(root, [package1, package2]);

    expect(actual.equals(expected)).toBe(true);
  });
});
