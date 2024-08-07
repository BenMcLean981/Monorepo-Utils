import { describe, expect, it } from 'vitest';
import {
  almostEqual,
  greaterThanAndNotEqual,
  greaterThanOrAlmostEqual,
  isZero,
  lessThanAndNotEqual,
  lessThanOrAlmostEqual,
} from '../equality/equalityChecks';

const tol = 0.01;

describe('almostEqual', () => {
  it('Returns false for different numbers.', () => {
    expect(almostEqual(5, 3)).toBe(false);
  });

  it('Returns false for numbers outside of tolerance.', () => {
    const n1 = 5;
    const n2 = n1 + tol * 2;

    expect(almostEqual(n1, n2, tol)).toBe(false);
    expect(almostEqual(n2, n1, tol)).toBe(false);
  });

  it('Returns true for numbers inside of tolerance.', () => {
    const n1 = 5;
    const n2 = n1 + tol / 2;

    expect(almostEqual(n1, n2, tol)).toBe(true);
    expect(almostEqual(n2, n1, tol)).toBe(true);
  });

  it('Returns true equal numbers.', () => {
    expect(almostEqual(5, 5)).toBe(true);
  });
});

describe('isZero', () => {
  it('Returns true for zero.', () => {
    expect(isZero(0, tol)).toBe(true);
  });

  it('Returns true for zero within tol.', () => {
    expect(isZero(tol / 2, tol)).toBe(true);
    expect(isZero(-tol / 2, tol)).toBe(true);
  });

  it('Returns false for zero outside tol.', () => {
    expect(isZero(tol * 2, tol)).toBe(false);
    expect(isZero(-tol * 2, tol)).toBe(false);
  });

  it('Returns false for not zero.', () => {
    expect(isZero(4, tol)).toBe(false);
    expect(isZero(-5, tol)).toBe(false);
  });
});

describe('lessThanOrAlmostEqual', () => {
  it('Returns true for less than.', () => {
    expect(lessThanOrAlmostEqual(3, 4)).toBe(true);
  });

  it('returns true for less than just outside tol.', () => {
    const n1 = 5;
    const n2 = n1 + tol * 2;

    expect(lessThanOrAlmostEqual(n1, n2, tol)).toBe(true);
  });

  it('Returns true for less but equal within tol.', () => {
    const n1 = 5;
    const n2 = n1 + tol / 2;

    expect(lessThanOrAlmostEqual(n1, n2, tol)).toBe(true);
  });

  it('Returns true for equal.', () => {
    expect(lessThanOrAlmostEqual(5, 5)).toBe(true);
  });

  it('Returns true for greater but equal within tol.', () => {
    const n1 = 5;
    const n2 = n1 - tol / 2;

    expect(lessThanOrAlmostEqual(n1, n2, tol)).toBe(true);
  });

  it('returns false for greater than just outside tol.', () => {
    const n1 = 5;
    const n2 = n1 - tol * 2;

    expect(lessThanOrAlmostEqual(n1, n2, tol)).toBe(false);
  });

  it('returns false for greater than.', () => {
    expect(lessThanOrAlmostEqual(4, 3)).toBe(false);
  });
});

describe('lessThanAndNotEqual.', () => {
  it('Returns true for less than.', () => {
    expect(lessThanAndNotEqual(3, 4)).toBe(true);
  });

  it('returns true for less than just outside tol.', () => {
    const n1 = 5;
    const n2 = n1 + tol * 2;

    expect(lessThanAndNotEqual(n1, n2, tol)).toBe(true);
  });

  it('Returns false for less but equal within tol.', () => {
    const n1 = 5;
    const n2 = n1 + tol / 2;

    expect(lessThanAndNotEqual(n1, n2, tol)).toBe(false);
  });

  it('Returns false for equal.', () => {
    expect(lessThanAndNotEqual(5, 5)).toBe(false);
  });

  it('Returns false for greater but equal within tol.', () => {
    const n1 = 5;
    const n2 = n1 - tol / 2;

    expect(lessThanAndNotEqual(n1, n2, tol)).toBe(false);
  });

  it('returns false for greater than just outside tol.', () => {
    const n1 = 5;
    const n2 = n1 - tol * 2;

    expect(lessThanAndNotEqual(n1, n2, tol)).toBe(false);
  });

  it('returns false for greater than.', () => {
    expect(lessThanAndNotEqual(4, 3)).toBe(false);
  });
});

describe('greaterThanOrAlmostEqual.', () => {
  it('Returns false for less than.', () => {
    expect(greaterThanOrAlmostEqual(3, 4)).toBe(false);
  });

  it('returns false for less than just outside tol.', () => {
    const n1 = 5;
    const n2 = n1 + tol * 2;

    expect(greaterThanOrAlmostEqual(n1, n2, tol)).toBe(false);
  });

  it('Returns true for less but equal within tol.', () => {
    const n1 = 5;
    const n2 = n1 + tol / 2;

    expect(greaterThanOrAlmostEqual(n1, n2, tol)).toBe(true);
  });

  it('Returns true for equal.', () => {
    expect(greaterThanOrAlmostEqual(5, 5)).toBe(true);
  });

  it('Returns true for greater but equal within tol.', () => {
    const n1 = 5;
    const n2 = n1 - tol / 2;

    expect(greaterThanOrAlmostEqual(n1, n2, tol)).toBe(true);
  });

  it('returns true for greater than just outside tol.', () => {
    const n1 = 5;
    const n2 = n1 - tol * 2;

    expect(greaterThanOrAlmostEqual(n1, n2, tol)).toBe(true);
  });

  it('returns true for greater than.', () => {
    expect(greaterThanOrAlmostEqual(4, 3)).toBe(true);
  });
});

describe('greaterThanAndNotEqual.', () => {
  it('Returns false for less than.', () => {
    expect(greaterThanAndNotEqual(3, 4)).toBe(false);
  });

  it('returns false for less than just outside tol.', () => {
    const n1 = 5;
    const n2 = n1 + tol * 2;

    expect(greaterThanAndNotEqual(n1, n2, tol)).toBe(false);
  });

  it('Returns false for less but equal within tol.', () => {
    const n1 = 5;
    const n2 = n1 + tol / 2;

    expect(greaterThanAndNotEqual(n1, n2, tol)).toBe(false);
  });

  it('Returns false for equal.', () => {
    expect(greaterThanAndNotEqual(5, 5)).toBe(false);
  });

  it('Returns false for greater but equal within tol.', () => {
    const n1 = 5;
    const n2 = n1 - tol / 2;

    expect(greaterThanAndNotEqual(n1, n2, tol)).toBe(false);
  });

  it('returns true for greater than just outside tol.', () => {
    const n1 = 5;
    const n2 = n1 - tol * 2;

    expect(greaterThanAndNotEqual(n1, n2, tol)).toBe(true);
  });

  it('returns true for greater than.', () => {
    expect(greaterThanAndNotEqual(4, 3)).toBe(true);
  });
});
