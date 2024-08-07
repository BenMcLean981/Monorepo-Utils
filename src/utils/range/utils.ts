import { isEmpty } from '../collections';
import { EmptyRange } from './emptyRange';
import { Range } from './range';

export function makeArrayIndices(array: ReadonlyArray<unknown>): Range {
  if (isEmpty(array)) {
    return new EmptyRange();
  } else {
    return new Range(0, array.length - 1);
  }
}

export function makeEnlargedArrayIndices(array: ReadonlyArray<unknown>): Range {
  return new Range(0, array.length);
}

export function isEmptyRange(range: Range): boolean {
  return range instanceof EmptyRange;
}
