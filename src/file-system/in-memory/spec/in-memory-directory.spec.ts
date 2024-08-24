import { describe, expect, it } from 'vitest';
import { InMemoryDirectory } from '../in-memory-directory';
import { InMemoryFile } from '../in-memory-file';

describe('InMemoryDirectory', () => {
  describe('equals', () => {
    it('Returns true for equal.', () => {
      const d1 = new InMemoryDirectory(
        'd1',
        [new InMemoryDirectory('sub', [], [])],
        [new InMemoryFile('f', 'foo')],
      );

      const d2 = new InMemoryDirectory(
        'd1',
        [new InMemoryDirectory('sub', [], [])],
        [new InMemoryFile('f', 'foo')],
      );

      expect(d1.equals(d2)).toBe(true);
    });

    it('Returns false for different names.', () => {
      const d1 = new InMemoryDirectory(
        'd1',
        [new InMemoryDirectory('sub', [], [])],
        [new InMemoryFile('f', 'foo')],
      );

      const d2 = new InMemoryDirectory(
        'different',
        [new InMemoryDirectory('sub', [], [])],
        [new InMemoryFile('f', 'foo')],
      );

      expect(d1.equals(d2)).toBe(false);
    });

    it('Returns false for different subdirectories.', () => {
      const d1 = new InMemoryDirectory(
        'd1',
        [new InMemoryDirectory('sub', [], [])],
        [new InMemoryFile('f', 'foo')],
      );

      const d2 = new InMemoryDirectory(
        'd1',
        [new InMemoryDirectory('other', [], [])],
        [new InMemoryFile('f', 'foo')],
      );

      expect(d1.equals(d2)).toBe(false);
    });

    it('Returns false for different files.', () => {
      const d1 = new InMemoryDirectory(
        'd1',
        [new InMemoryDirectory('sub', [], [])],
        [new InMemoryFile('f', 'foo')],
      );

      const d2 = new InMemoryDirectory(
        'd1',
        [new InMemoryDirectory('sub', [], [])],
        [new InMemoryFile('other', 'foo')],
      );

      expect(d1.equals(d2)).toBe(false);
    });

    it('Returns false for different types.', () => {
      const d = new InMemoryDirectory(
        'd1',
        [new InMemoryDirectory('sub', [], [])],
        [new InMemoryFile('f', 'foo')],
      );

      expect(d.equals(undefined)).toBe(false);
    });
  });
});
