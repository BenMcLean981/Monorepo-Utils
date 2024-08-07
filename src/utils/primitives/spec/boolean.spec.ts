import { describe, expect, it } from 'vitest';
import { xor } from '../boolean';

describe('xor', () => {
  it('Returns false when both false.', () => {
    expect(xor(false, false)).toBe(false);
  });

  it('Returns false when both true.', () => {
    expect(xor(true, true)).toBe(false);
  });

  it('Returns true when one true.', () => {
    expect(xor(true, false)).toBe(true);
    expect(xor(false, true)).toBe(true);
  });
});
