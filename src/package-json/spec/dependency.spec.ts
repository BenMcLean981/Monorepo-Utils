import { describe, expect, it } from 'vitest';
import { Dependency } from '../dependency';

describe('Dependency', () => {
  describe('constructor', () => {
    it('Sets getters.', () => {
      const d = new Dependency('foo', '0.1.2');

      expect(d.name).toBe('foo');
      expect(d.version).toBe('0.1.2');
    });
  });

  describe('equals', () => {
    it('Returns true for equal.', () => {
      const d1 = new Dependency('foo', '0.1.2');
      const d2 = new Dependency('foo', '0.1.2');

      expect(d1.equals(d2)).toBe(true);
    });

    it('Returns false for different names.', () => {
      const d1 = new Dependency('foo', '0.1.2');
      const d2 = new Dependency('bar', '0.1.2');

      expect(d1.equals(d2)).toBe(false);
    });

    it('Returns false for different versions.', () => {
      const d1 = new Dependency('foo', '0.1.2');
      const d2 = new Dependency('foo', '0.1.3');

      expect(d1.equals(d2)).toBe(false);
    });

    it('Returns false for different types.', () => {
      const d = new Dependency('foo', '0.1.2');

      expect(d.equals(undefined)).toBe(false);
    });
  });
});
