import { Range } from '../range/range';

export interface Rules {
  readonly range: Range;

  shouldInclude(n: number, tol?: number): boolean;
}
