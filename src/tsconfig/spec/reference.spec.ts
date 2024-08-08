import { describe, expect, it } from 'vitest';
import { Reference } from '../reference';

describe('Reference', () => {
  describe('constructor', () => {
    it('Sets path.', () => {
      const reference = new Reference('../foo');

      expect(reference.path).toBe('../foo');
    });
  });

  describe('equals', () => {
    it('Returns true for equal.', () => {
      const r1 = new Reference('../foo');
      const r2 = new Reference('../foo');

      expect(r1.equals(r2)).toBe(true);
    });

    it('Returns false for different paths.', () => {
      const r1 = new Reference('../foo');
      const r2 = new Reference('../bar');

      expect(r1.equals(r2)).toBe(false);
    });
  });
});
