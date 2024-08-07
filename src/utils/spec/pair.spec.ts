import { describe, expect, it } from 'vitest';
import { equalInOrder, isEmpty } from '../collections';
import { Pair } from '../pair';

describe('Pair', () => {
  describe('makePairs', () => {
    it('Returns empty for an empty array.', () => {
      const pairs = Pair.makePairs([]);

      expect(isEmpty(pairs)).toBe(true);
    });

    it('Throws an error for an array of length 1.', () => {
      expect(() => Pair.makePairs([1])).toThrow();
    });

    it('Returns a singular pair for 2 items.', () => {
      const actual = Pair.makePairs([1, 2]);
      const expected = [new Pair(1, 2)];

      expect(equalInOrder(expected, actual, areEqual)).toBe(true);
    });

    it('Returns two pairs for 3 items.', () => {
      const actual = Pair.makePairs([1, 2, 3]);
      const expected = [new Pair(1, 2), new Pair(2, 3)];

      expect(equalInOrder(expected, actual, areEqual)).toBe(true);
    });

    it('Returns three pairs for 4 items.', () => {
      const actual = Pair.makePairs([1, 2, 3, 0]);
      const expected = [new Pair(1, 2), new Pair(2, 3), new Pair(3, 0)];

      expect(equalInOrder(expected, actual, areEqual)).toBe(true);
    });
  });
});

function areEqual(t1: Pair<number>, t2: Pair<number>): boolean {
  return t1.item1 === t2.item1 && t1.item2 === t2.item2;
}
