import { describe, expect, it } from 'vitest';
import { contains } from '../contains';

describe('contains', () => {
  it('Returns false for an empty array.', () => {
    expect(contains([], 'foo')).toBe(false);
  });

  it('Returns false for item not in array.', () => {
    expect(contains(['a', 'b', 'c'], 'foo')).toBe(false);
  });

  it('Returns true for item in array.', () => {
    expect(contains(['foo', 'b', 'c'], 'foo')).toBe(true);
    expect(contains(['a', 'foo', 'c'], 'foo')).toBe(true);
    expect(contains(['a', 'b', 'foo'], 'foo')).toBe(true);

    expect(contains(['foo'], 'foo')).toBe(true);
  });
});
