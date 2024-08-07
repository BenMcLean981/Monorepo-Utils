import { describe, expect, it } from 'vitest';
import { isEven, isOdd, max, min } from '../number';

describe('isEven', () => {
  it('Returns true for negative even.', () => {
    expect(isEven(-2)).toBe(true);
    expect(isEven(-4)).toBe(true);
    expect(isEven(-6)).toBe(true);
    expect(isEven(-8)).toBe(true);
    expect(isEven(-10)).toBe(true);
    expect(isEven(-98)).toBe(true);
  });

  it('Returns false for negative odd.', () => {
    expect(isEven(-1)).toBe(false);
    expect(isEven(-3)).toBe(false);
    expect(isEven(-7)).toBe(false);
    expect(isEven(-9)).toBe(false);
    expect(isEven(-15)).toBe(false);
    expect(isEven(-97)).toBe(false);
  });

  it('Returns true for zero.', () => {
    expect(isEven(0)).toBe(true);
  });

  it('Returns false for positive odd.', () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(3)).toBe(false);
    expect(isEven(7)).toBe(false);
    expect(isEven(9)).toBe(false);
    expect(isEven(15)).toBe(false);
    expect(isEven(97)).toBe(false);
  });

  it('Returns true for positive even.', () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(4)).toBe(true);
    expect(isEven(6)).toBe(true);
    expect(isEven(8)).toBe(true);
    expect(isEven(10)).toBe(true);
    expect(isEven(98)).toBe(true);
  });
});

describe('isOdd', () => {
  it('Returns false for negative even.', () => {
    expect(isOdd(-2)).toBe(false);
    expect(isOdd(-4)).toBe(false);
    expect(isOdd(-6)).toBe(false);
    expect(isOdd(-8)).toBe(false);
    expect(isOdd(-10)).toBe(false);
    expect(isOdd(-98)).toBe(false);
  });

  it('Returns true for negative odd.', () => {
    expect(isOdd(-1)).toBe(true);
    expect(isOdd(-3)).toBe(true);
    expect(isOdd(-7)).toBe(true);
    expect(isOdd(-9)).toBe(true);
    expect(isOdd(-15)).toBe(true);
    expect(isOdd(-97)).toBe(true);
  });

  it('Returns false for zero.', () => {
    expect(isOdd(0)).toBe(false);
  });

  it('Returns true for positive odd.', () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(3)).toBe(true);
    expect(isOdd(7)).toBe(true);
    expect(isOdd(9)).toBe(true);
    expect(isOdd(15)).toBe(true);
    expect(isOdd(97)).toBe(true);
  });

  it('Returns false for positive even.', () => {
    expect(isOdd(2)).toBe(false);
    expect(isOdd(4)).toBe(false);
    expect(isOdd(6)).toBe(false);
    expect(isOdd(8)).toBe(false);
    expect(isOdd(10)).toBe(false);
    expect(isOdd(98)).toBe(false);
  });
});

describe('min', () => {
  it('Throws an error for an empty array.', () => {
    expect(() => min([])).toThrow();
  });

  it('Returns the only number if one is given.', () => {
    expect(min([5])).toBe(5);
    expect(min([-1])).toBe(-1);
  });

  it('Fins the minimum number in the array.', () => {
    expect(min([1, 2, 3])).toBe(1);
    expect(min([4, -5])).toBe(-5);
    expect(min([8, 2, -4, 5, 10, -2])).toBe(-4);
  });
});

describe('max', () => {
  it('Throws an error for an empty array.', () => {
    expect(() => max([])).toThrow();
  });

  it('Returns the only number if one is given.', () => {
    expect(max([5])).toBe(5);
    expect(max([-1])).toBe(-1);
  });

  it('Fins the maximum number in the array.', () => {
    expect(max([1, 2, 3])).toBe(3);
    expect(max([4, -5])).toBe(4);
    expect(max([8, 2, -4, 5, 10, -2])).toBe(10);
  });
});
