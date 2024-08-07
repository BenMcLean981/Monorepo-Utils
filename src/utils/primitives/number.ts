import { isEmpty } from '../collections/array';

export function isEven(n: number): boolean {
  return n % 2 === 0;
}

export function isOdd(n: number): boolean {
  return !isEven(n);
}

export function min(nums: Array<number>): number {
  if (isEmpty(nums)) {
    throw new Error('Cannot find min of empty set of numbers.');
  }

  return nums.reduce((min, n) => Math.min(min, n));
}

export function max(nums: Array<number>): number {
  if (isEmpty(nums)) {
    throw new Error('Cannot find max of empty set of numbers.');
  }

  return nums.reduce((max, n) => Math.max(max, n));
}
