import { EqualityChecker, defaultEqualityChecker } from './equalityChecker';

export function contains<T>(
  arr: ReadonlyArray<T>,
  item: T,
  checker: EqualityChecker<T> = defaultEqualityChecker,
): boolean {
  return arr.find((i) => checker(item, i)) !== undefined;
}
