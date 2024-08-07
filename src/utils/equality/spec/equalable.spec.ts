import { describe, expect, it } from 'vitest';
import { isEqualable } from '../equalable';

describe('isEqualable', () => {
  it('Returns false for not an object.', () => {
    expect(isEqualable(5)).toBe(false);
  });

  it('Returns false for undefined.', () => {
    expect(isEqualable(undefined)).toBe(false);
  });

  it('Returns false for null.', () => {
    expect(isEqualable(null)).toBe(false);
  });

  it('Returns false for an object without equals.', () => {
    expect(isEqualable({})).toBe(false);
  });

  it('Returns false for an object with equals that is not a function.', () => {
    expect(isEqualable({ equals: 5 })).toBe(false);
  });

  it('Returns true for an object with an equals function.', () => {
    expect(isEqualable({ equals: () => undefined })).toBe(true);
  });
});
