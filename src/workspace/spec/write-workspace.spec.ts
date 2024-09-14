import { describe, expect, it } from 'vitest';
import { InMemoryFileSystem } from '../../file-system/in-memory/in-memory-file-system';
import { Path } from '../../file-system/path';
import { PackageJson } from '../../package-json';
import { Project } from '../../project';
import { TsConfig } from '../../tsconfig/ts-config';
import { parseWorkspace } from '../prase-workspace';
import { Workspace } from '../workspace';
import { writeWorkspace } from '../write-workspace';

describe('writeWorkspace', () => {
  it('Writes a Workspace to the file system.', () => {
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

    const expected = new Workspace(root, [package1, package2]);
    writeWorkspace(expected, fs);

    const actual = parseWorkspace(root.path.full, fs);

    expect(actual.equals(expected)).toBe(true);
  });
});
