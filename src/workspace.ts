import globToRegexp from 'glob-to-regexp';
import { cwd } from 'process';
import { Directory } from './file-system/directory';
import { FileSystem } from './file-system/file-system';
import { NodeFileSystem } from './file-system/node/node-file-system';
import { Path } from './file-system/path';
import { Equalable, haveSameItems } from './haveSameItems';
import { PackageJson } from './package-json';
import { Project } from './project';
import { TsConfig } from './tsconfig/ts-config';

export class Workspace implements Equalable {
  private readonly _root: Project;

  private readonly _projects: ReadonlyArray<Project>;

  public constructor(root: Project, projects: ReadonlyArray<Project>) {
    this._root = root;
    this._projects = projects;

    this.validate();
  }

  public static parse(
    rootDir: string = cwd(),
    fileSystem = new NodeFileSystem(),
  ): Workspace {
    const rootPath = new Path(rootDir);
    const root = Workspace.parseProject(rootPath, fileSystem);

    const packageRoots = Workspace.getPackageRoots(root, rootPath, fileSystem);
    const packages = packageRoots.map((root) =>
      Workspace.parseProject(root.path, fileSystem),
    );

    return new Workspace(root, packages);
  }

  private static getPackageRoots(
    root: Project,
    rootPath: Path,
    fileSystem: NodeFileSystem,
  ): ReadonlyArray<Directory> {
    const rootDirectory = fileSystem.getDirectory(rootPath);

    const globs = root.packageJson.workspaces.map(
      (workspaceGlob) => `${rootPath}/${workspaceGlob}`,
    );
    const regexps = globs.map((g) => globToRegexp(g));

    const directories = getAllSubdirectories(rootDirectory);

    return directories.filter((d) => regexps.some((r) => r.test(d.path.full)));
  }

  private static parseProject(path: Path, fileSystem: FileSystem): Project {
    const rootPackageJsonFile = fileSystem.getFile(path.sub('package.json'));
    const rootTsconfigFile = fileSystem.getFile(path.sub('tsconfig.json'));

    const rootPackageJson = PackageJson.parse(rootPackageJsonFile.read());
    const rootTsconfig = TsConfig.parse(rootTsconfigFile.read());

    return new Project(path, rootPackageJson, rootTsconfig);
  }

  private validate(): void {
    if (!isWorkspace(this._root)) {
      throw new Error('Root project is not a workspace.');
    }

    if (this._projects.some(isWorkspace)) {
      throw new Error('Cannot have nested workspaces.');
    }

    const names = [
      ...this._projects.map((p) => p.packageJson.name),
      this._root.packageJson.name,
    ];

    names.forEach((n1) => {
      const count = names.filter((n2) => n1 === n2).length;

      if (count !== 1) {
        throw new Error(
          `Package name "${n1}" is duplicated. Package names must be unique.`,
        );
      }
    });
  }

  public equals(other: unknown): boolean {
    if (other instanceof Workspace) {
      return (
        this._root.equals(other._root) &&
        haveSameItems(this._projects, other._projects, (p1, p2) =>
          p1.equals(p2),
        )
      );
    } else {
      return false;
    }
  }
}

function isWorkspace(project: Project): boolean {
  return project.packageJson.workspaces.length > 0;
}

function getAllSubdirectories(directory: Directory): ReadonlyArray<Directory> {
  return [directory, ...directory.subDirectories.flatMap(getAllSubdirectories)];
}
