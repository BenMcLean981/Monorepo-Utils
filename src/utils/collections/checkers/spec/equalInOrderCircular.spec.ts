import { describe, expect, it } from 'vitest';
import { equalInOrderCircular } from '../equalInOrderCircular';

describe('equalInOrderCircular', () => {
  it('Returns true for equal arrays.', () => {
    expect(equalInOrderCircular([], [], areEqual)).toBe(true);
  });

  it('Returns false for unequal lengths.', () => {
    expect(equalInOrderCircular([], [1], areEqual)).toBe(false);
    expect(equalInOrderCircular([1], [], areEqual)).toBe(false);
  });

  it('Returns true for equal in order.', () => {
    expect(equalInOrderCircular([1, 2, 3], [1, 2, 3], areEqual)).toBe(true);
  });

  it('Returns false for not equal in order.', () => {
    expect(equalInOrderCircular([1, 2, 3], [3, 2, 1], areEqual)).toBe(false);
  });

  it('Returns true for equal in order but shifted.', () => {
    expect(equalInOrderCircular([1, 2, 3], [3, 1, 2], areEqual)).toBe(true);
  });
});

function areEqual(n1: number, n2: number): boolean {
  return n1 === n2;
}
