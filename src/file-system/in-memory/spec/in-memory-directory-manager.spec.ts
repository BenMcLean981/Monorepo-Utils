import { beforeEach, describe, expect, it } from 'vitest';
import { DirectoryManager } from '../../directory-manager';
import { InMemoryDirectoryManager } from '../in-memory-directory-manager';

describe('InMemoryDirectoryManager', () => {
  let manager: DirectoryManager;

  beforeEach(() => {
    manager = new InMemoryDirectoryManager();
  });

  describe('exists', () => {
    it('Returns false when a directory does not exist.', () => {
      expect(manager.exists('/foo')).toBe(false);
    });
  });
});
