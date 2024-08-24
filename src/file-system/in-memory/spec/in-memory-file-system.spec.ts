import { beforeEach, describe, expect, it } from 'vitest';
import { FileSystem } from '../../file-system';
import { InMemoryDirectory } from '../in-memory-directory';
import { InMemoryFile } from '../in-memory-file';
import { InMemoryFileSystem } from '../in-memory-file-system';

describe('InMemoryFileSystem', () => {
  let fileSystem: FileSystem;

  beforeEach(() => {
    fileSystem = new InMemoryFileSystem();
  });

  describe('exists', () => {
    it('Returns false when a directory does not exist.', () => {
      expect(fileSystem.exists('/foo')).toBe(false);
    });

    it('Returns true when a directory exists.', () => {
      fileSystem.createDirectory('/foo');

      expect(fileSystem.exists('/foo')).toBe(true);
    });

    it('Returns true when a deeply nested directory exists.', () => {
      fileSystem.createDirectory('/foo/bar/asdf');

      expect(fileSystem.exists('/foo')).toBe(true);
      expect(fileSystem.exists('/foo/bar')).toBe(true);
      expect(fileSystem.exists('/foo/bar/asdf')).toBe(true);
    });

    it('Returns true when a file exists.', () => {
      fileSystem.createFile('/foo', 'contents');

      expect(fileSystem.exists('/foo')).toBe(true);
    });

    it('Returns true when a deeply nested file exists.', () => {
      fileSystem.createFile('/foo/bar/asdf', 'contents');

      expect(fileSystem.exists('/foo')).toBe(true);
      expect(fileSystem.exists('/foo/bar')).toBe(true);
      expect(fileSystem.exists('/foo/bar/asdf')).toBe(true);
    });
  });

  describe('getFile', () => {
    it('Throws an error when it does not exist.', () => {
      expect(() => fileSystem.getFile('/foo/bar.txt')).toThrowError();
    });

    it('Returns the file when it exists.', () => {
      fileSystem.createFile('/foo/bar/asdf.txt', 'contents');

      const actual = fileSystem.getFile('/foo/bar/asdf.txt');
      const expected = new InMemoryFile('asdf.txt', 'contents');

      expect(expected.equals(actual)).toBe(true);
    });
  });

  describe('getDirectory', () => {
    it('Throws an error when it does not exist.', () => {
      expect(() => fileSystem.getDirectory('/foo/bar.txt')).toThrowError();
    });

    it('Returns the directory when it exists.', () => {
      fileSystem.createDirectory('/foo/bar/asdf');

      const actual = fileSystem.getDirectory('/foo/bar/asdf');
      const expected = new InMemoryDirectory('asdf', [], []);

      expect(expected.equals(actual)).toBe(true);
    });
  });
});
