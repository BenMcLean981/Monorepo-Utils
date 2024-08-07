import { describe, expect, it } from 'vitest';
import { add } from '../add';

describe('add', () => {
  it('Adds two numbers.', () => {
    expect(add(1, 2)).toBe(3);
  });
});
