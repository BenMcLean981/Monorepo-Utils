import { describe, expect, it } from 'vitest';
import { InMemoryFile } from '../in-memory-file';

describe('InMemoryFile', () => {
  describe('read', () => {
    it('Gets the contents.', () => {
      const f = new InMemoryFile('foo.txt', 'example');

      expect(f.read()).toBe('example');
    });
  });

  describe('equals', () => {
    it('Returns true for equal files.', () => {
      const f1 = new InMemoryFile('foo.txt', 'example');
      const f2 = new InMemoryFile('foo.txt', 'example');

      expect(f1.equals(f2)).toBe(true);
    });

    it('Returns false for different names.', () => {
      const f1 = new InMemoryFile('foo.txt', 'example');
      const f2 = new InMemoryFile('bar.txt', 'example');

      expect(f1.equals(f2)).toBe(false);
    });

    it('Returns false for different contents.', () => {
      const f1 = new InMemoryFile('foo.txt', 'example');
      const f2 = new InMemoryFile('foo.txt', 'example-2');

      expect(f1.equals(f2)).toBe(false);
    });
  });
});
