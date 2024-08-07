import { describe, expect, it } from 'vitest';
import { sub } from '../sub';

describe('sub', () => {
  it('Subtracts two numbers.', () => {
    expect(sub(4, 3)).toBe(1);
  });
});
