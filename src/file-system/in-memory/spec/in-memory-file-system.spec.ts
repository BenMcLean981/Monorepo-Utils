import { beforeEach, describe, expect, it } from 'vitest';
import { FileSystem } from '../../file-system';
import { Path } from '../../path';
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
      expect(fileSystem.exists(new Path('/foo'))).toBe(false);
    });

    it('Returns true when a directory exists.', () => {
      fileSystem.createDirectory(new Path('/foo'));

      expect(fileSystem.exists(new Path('/foo'))).toBe(true);
    });

    it('Returns true when a deeply nested directory exists.', () => {
      fileSystem.createDirectory(new Path('/foo/bar/asdf'));

      expect(fileSystem.exists(new Path('/foo'))).toBe(true);
      expect(fileSystem.exists(new Path('/foo/bar'))).toBe(true);
      expect(fileSystem.exists(new Path('/foo/bar/asdf'))).toBe(true);
    });

    it('Returns true when a file exists.', () => {
      fileSystem.createFile(new Path('/foo'), 'contents');

      expect(fileSystem.exists(new Path('/foo'))).toBe(true);
    });

    it('Returns true when a deeply nested file exists.', () => {
      fileSystem.createFile(new Path('/foo/bar/asdf'), 'contents');

      expect(fileSystem.exists(new Path('/foo'))).toBe(true);
      expect(fileSystem.exists(new Path('/foo/bar'))).toBe(true);
      expect(fileSystem.exists(new Path('/foo/bar/asdf'))).toBe(true);
    });
  });

  describe('getFile', () => {
    it('Throws an error when it does not exist.', () => {
      expect(() => fileSystem.getFile(new Path('/foo/bar.txt'))).toThrowError();
    });

    it('Returns the file when it exists.', () => {
      const path = new Path('/foo/bar/asdf.txt');
      fileSystem.createFile(path, 'contents');

      const actual = fileSystem.getFile(path);
      const expected = new InMemoryFile(path, 'contents');

      expect(expected.equals(actual)).toBe(true);
    });
  });

  describe('getDirectory', () => {
    it('Throws an error when it does not exist.', () => {
      expect(() =>
        fileSystem.getDirectory(new Path('/foo/bar.txt')),
      ).toThrowError();
    });

    it('Returns the directory when it exists.', () => {
      const path = new Path('/foo/bar/asdf');

      fileSystem.createDirectory(path);

      const actual = fileSystem.getDirectory(path);
      const expected = new InMemoryDirectory(path, [], []);

      expect(expected.equals(actual)).toBe(true);
    });
  });

  describe('createFile', () => {
    it('Creates the chain of directories that are missing.', () => {
      fileSystem.createDirectory(new Path('/foo'));
      fileSystem.createFile(new Path('/foo/bar/asdf.txt'), 'contents');

      const actual = fileSystem.getFile(new Path('/foo/bar/asdf.txt'));
      const expected = new InMemoryFile(
        new Path('/foo/bar/asdf.txt'),
        'contents',
      );

      expect(expected.equals(actual)).toBe(true);
    });
  });

  describe('createDirectory', () => {
    it("Doesn't create a directory with an empty name.", () => {
      fileSystem.createDirectory(new Path('/foo/bar/'));

      const actual = fileSystem.getDirectory(new Path('/foo/bar'));
      const expected = new InMemoryDirectory(new Path('/foo/bar'), [], []);

      expect(expected.equals(actual)).toBe(true);
    });
  });
});
