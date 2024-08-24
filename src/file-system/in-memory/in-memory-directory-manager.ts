import { DirectoryManager } from '../directory-manager';

export class InMemoryDirectoryManager implements DirectoryManager {
  public exists(path: string): boolean {
    return false;
  }
}
