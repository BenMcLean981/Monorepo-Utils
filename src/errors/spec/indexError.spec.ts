import { describe, expect, it } from 'vitest';
import { Range } from '../../utils';
import { EmptyRange } from '../../utils/range/emptyRange';
import { IndexError } from '../indexError';

describe('IndexError', () => {
  describe('constructor', () => {
    it('Creates an error message for an empty range.', () => {
      const error = new IndexError(2, new EmptyRange());

      expect(error.message).toContain('empty');
    });

    it('Creates an error message for a range.', () => {
      const error = new IndexError(4, new Range(0, 3));

      expect(error.message).toContain('[0, 3]');
      expect(error.message).toContain('received: 4');
    });
  });
});
