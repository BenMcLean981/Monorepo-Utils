import { describe, expect, it } from 'vitest';
import { IndexError } from '../../../errors';
import { validateEnlargedIndex, validateIndex } from '../utils';

describe('validateIndex.', () => {
  it('Throws an IndexError for an empty array.', () => {
    expect(() => validateIndex([], -1)).toThrow(IndexError);
    expect(() => validateIndex([], 0)).toThrow(IndexError);
    expect(() => validateIndex([], 1)).toThrow(IndexError);
  });

  it('Throws an IndexError for an index too small.', () => {
    expect(() => validateIndex([1, 2, 3], -1)).toThrow(IndexError);
  });

  it('Throws an IndexError for an index too large.', () => {
    expect(() => validateIndex([1, 2, 3], 4)).toThrow(IndexError);
  });

  it('Does not throw an error for an index in range.', () => {
    expect(() => validateIndex([1, 2, 3], 0)).not.toThrow();
    expect(() => validateIndex([1, 2, 3], 1)).not.toThrow();
    expect(() => validateIndex([1, 2, 3], 2)).not.toThrow();
  });
});

describe('validateEnlargedIndex.', () => {
  it('Throws an IndexError for an empty array at non-zero.', () => {
    expect(() => validateEnlargedIndex([], -1)).toThrow(IndexError);
    expect(() => validateEnlargedIndex([], 1)).toThrow(IndexError);

    expect(() => validateEnlargedIndex([], 0)).not.toThrow(IndexError);
  });

  it('Throws an IndexError for an index too small.', () => {
    expect(() => validateEnlargedIndex([1, 2, 3], -1)).toThrow(IndexError);
  });

  it('Throws an IndexError for an index too large.', () => {
    expect(() => validateEnlargedIndex([1, 2, 3], 5)).toThrow(IndexError);
  });

  it('Does not throw an error for an index in range.', () => {
    expect(() => validateEnlargedIndex([1, 2, 3], 0)).not.toThrow();
    expect(() => validateEnlargedIndex([1, 2, 3], 1)).not.toThrow();
    expect(() => validateEnlargedIndex([1, 2, 3], 2)).not.toThrow();
    expect(() => validateEnlargedIndex([1, 2, 3], 3)).not.toThrow();
  });
});
