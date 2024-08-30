import { FileSystem } from '../file-system/file-system';
import { NodeFileSystem } from '../file-system/node/node-file-system';
import { Project } from '../project';
import { Workspace } from './workspace';

export function writeWorkspace(
  workspace: Workspace,
  fileSystem: FileSystem = new NodeFileSystem(),
): void {
  writeProject(workspace.root, fileSystem);

  workspace.projects.forEach((p) => writeProject(p, fileSystem));
}

function writeProject(project: Project, fileSystem: FileSystem): void {
  fileSystem.writeFile(
    project.path.sub('package.json'),
    project.packageJson.format(),
  );
  fileSystem.writeFile(
    project.path.sub('tsconfig.json'),
    project.tsconfig.format(),
  );
}
