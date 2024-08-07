import { describe, expect, it } from 'vitest';
import { IndexError } from '../../../errors';
import { equalInOrder } from '../checkers';
import { shiftTo } from '../shiftTo';

describe('shiftTo', () => {
  it('Throws an IndexError for index out of range.', () => {
    expect(() => shiftTo([1, 2, 3], -1)).toThrow(IndexError);
    expect(() => shiftTo([1, 2, 3], 4)).toThrow(IndexError);
  });

  it('Does nothing for idx 0.', () => {
    const arr = [1, 2, 3];

    expect(equalInOrder(shiftTo(arr, 0), arr, areEqual)).toBe(true);
  });

  it('Shifts to the supplied index.', () => {
    const arr = [1, 2, 3];

    expect(equalInOrder(shiftTo(arr, 1), [2, 3, 1], areEqual)).toBe(true);
    expect(equalInOrder(shiftTo(arr, 2), [3, 1, 2], areEqual)).toBe(true);
  });
});

function areEqual(n1: number, n2: number): boolean {
  return n1 === n2;
}
