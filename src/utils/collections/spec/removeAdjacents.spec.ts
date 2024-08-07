import { describe, expect, it } from 'vitest';
import { isEmpty } from '../array';
import { equalInOrder } from '../checkers';
import { removeAdjacents } from '../removeAdjacents';

const checker = (a: number, b: number): boolean => a === b;

describe('removeAdjacents', () => {
  it('Does nothing to an empty array.', () => {
    const actual = removeAdjacents([], checker);

    expect(isEmpty(actual)).toBe(true);
  });

  it('Does nothing to an array with one item.', () => {
    const arr = [5];
    const actual = removeAdjacents(arr, (a, b) => a === b);

    expect(equalInOrder(arr, actual, checker)).toBe(true);
  });

  it('Removes duplicate items.', () => {
    const actual = removeAdjacents([5, 5], (a, b) => a === b);
    const expected = [5];

    expect(equalInOrder(actual, expected, checker)).toBe(true);
  });

  it('Only removes adjacent duplicate items.', () => {
    const arr = [5, 4, 5];
    const actual = removeAdjacents(arr, (a, b) => a === b);

    expect(equalInOrder(arr, actual, checker)).toBe(true);
  });

  it('Removes all adjacent duplicate items.', () => {
    const arr = [5, 4, 4, 5, 6, 7, 8, 7, 0, 0, 7, 7];

    const actual = removeAdjacents(arr, (a, b) => a === b);
    const expected = [5, 4, 5, 6, 7, 8, 7, 0, 7];

    expect(equalInOrder(actual, expected, checker)).toBe(true);
  });
});
