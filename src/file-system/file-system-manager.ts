import { DirectoryManager } from './directory-manager';
import { FileManager } from './file-manager';

export interface FileSystemManager {
  readonly fileManager: FileManager;

  readonly directoryManager: DirectoryManager;
}
