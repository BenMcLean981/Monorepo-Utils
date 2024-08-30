import globToRegExp from 'glob-to-regexp';
import { Directory } from '../file-system/directory';
import { FileSystem } from '../file-system/file-system';
import { NodeFileSystem } from '../file-system/node/node-file-system';
import { Path } from '../file-system/path';
import { PackageJson } from '../package-json';
import { Project } from '../project';
import { TsConfig } from '../tsconfig/ts-config';
import { Workspace } from './workspace';

export function parseWorkspace(
  rootDir: string = process.cwd(),
  fileSystem: FileSystem = new NodeFileSystem(),
): Workspace {
  const rootPath = new Path(rootDir);
  const root = parseProject(rootPath, fileSystem);

  const packageRoots = getPackageRoots(root, rootPath, fileSystem);
  const packages = packageRoots.map((root) =>
    parseProject(root.path, fileSystem),
  );

  return new Workspace(root, packages);
}

function getPackageRoots(
  root: Project,
  rootPath: Path,
  fileSystem: NodeFileSystem,
): ReadonlyArray<Directory> {
  const rootDirectory = fileSystem.getDirectory(rootPath);

  const globs = root.packageJson.workspaces.map(
    (workspaceGlob) => `${rootPath}/${workspaceGlob}`,
  );
  const regexps = globs.map((g) => globToRegExp(g));

  const directories = getAllSubdirectories(rootDirectory);

  return directories.filter((d) => regexps.some((r) => r.test(d.path.full)));
}

function parseProject(path: Path, fileSystem: FileSystem): Project {
  const rootPackageJsonFile = fileSystem.getFile(path.sub('package.json'));
  const rootTsconfigFile = fileSystem.getFile(path.sub('tsconfig.json'));

  const rootPackageJson = PackageJson.parse(rootPackageJsonFile.read());
  const rootTsconfig = TsConfig.parse(rootTsconfigFile.read());

  return new Project(path, rootPackageJson, rootTsconfig);
}

function getAllSubdirectories(directory: Directory): ReadonlyArray<Directory> {
  return [directory, ...directory.subDirectories.flatMap(getAllSubdirectories)];
}
