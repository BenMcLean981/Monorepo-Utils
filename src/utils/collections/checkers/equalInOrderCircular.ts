import { shiftTo } from '../shiftTo';
import { bothZeroLength, diffLength } from '../utils';
import { equalInOrder } from './equalInOrder';
import { EqualityChecker, defaultEqualityChecker } from './equalityChecker';

export function equalInOrderCircular<T>(
  arr1: Array<T>,
  arr2: Array<T>,
  areEqual: EqualityChecker<T> = defaultEqualityChecker,
): boolean {
  if (diffLength(arr1, arr2)) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    const shifted = shiftTo(arr1, i);

    if (equalInOrder(shifted, arr2, areEqual)) {
      return true;
    }
  }

  return bothZeroLength(arr1, arr2);
}
