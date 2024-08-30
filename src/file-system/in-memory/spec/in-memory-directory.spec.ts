import { describe, expect, it } from 'vitest';
import { Path } from '../../path';
import { InMemoryDirectory } from '../in-memory-directory';
import { InMemoryFile } from '../in-memory-file';

describe('InMemoryDirectory', () => {
  describe('equals', () => {
    it('Returns true for equal.', () => {
      const d1 = new InMemoryDirectory(
        new Path('d1'),
        [new InMemoryDirectory(new Path('sub'), [], [])],
        [new InMemoryFile(new Path('f'), 'foo')],
      );

      const d2 = new InMemoryDirectory(
        new Path('d1'),
        [new InMemoryDirectory(new Path('sub'), [], [])],
        [new InMemoryFile(new Path('f'), 'foo')],
      );

      expect(d1.equals(d2)).toBe(true);
    });

    it('Returns false for different names.', () => {
      const d1 = new InMemoryDirectory(
        new Path('d1'),
        [new InMemoryDirectory(new Path('sub'), [], [])],
        [new InMemoryFile(new Path('f'), 'foo')],
      );

      const d2 = new InMemoryDirectory(
        new Path('different'),
        [new InMemoryDirectory(new Path('sub'), [], [])],
        [new InMemoryFile(new Path('f'), 'foo')],
      );

      expect(d1.equals(d2)).toBe(false);
    });

    it('Returns false for different subdirectories.', () => {
      const d1 = new InMemoryDirectory(
        new Path('d1'),
        [new InMemoryDirectory(new Path('sub'), [], [])],
        [new InMemoryFile(new Path('f'), 'foo')],
      );

      const d2 = new InMemoryDirectory(
        new Path('d1'),
        [new InMemoryDirectory(new Path('other'), [], [])],
        [new InMemoryFile(new Path('f'), 'foo')],
      );

      expect(d1.equals(d2)).toBe(false);
    });

    it('Returns false for different files.', () => {
      const d1 = new InMemoryDirectory(
        new Path('d1'),
        [new InMemoryDirectory(new Path('sub'), [], [])],
        [new InMemoryFile(new Path('f'), 'foo')],
      );

      const d2 = new InMemoryDirectory(
        new Path('d1'),
        [new InMemoryDirectory(new Path('sub'), [], [])],
        [new InMemoryFile(new Path('other'), 'foo')],
      );

      expect(d1.equals(d2)).toBe(false);
    });

    it('Returns false for different types.', () => {
      const d = new InMemoryDirectory(
        new Path('d1'),
        [new InMemoryDirectory(new Path('sub'), [], [])],
        [new InMemoryFile(new Path('f'), 'foo')],
      );

      expect(d.equals(undefined)).toBe(false);
    });
  });
});
