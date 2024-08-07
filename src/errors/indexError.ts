import { isEmptyRange, Range } from '../utils';

export class IndexError extends Error {
  constructor(index: number, range: Range) {
    if (isEmptyRange(range)) {
      super('Tried to index an empty collection.');
    } else {
      const message = [
        'Index out of range.',
        `Expected: [${range.lower}, ${range.upper}],`,
        `received: ${index}`,
      ].join(' ');

      super(message);
    }
  }
}
