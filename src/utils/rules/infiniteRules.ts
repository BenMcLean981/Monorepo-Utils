import { TOL } from '../../tol';
import { almostEqual } from '../equality/equalityChecks';
import { Range } from '../range/range';
import { Rules } from './rules.interface';

export class InfiniteRules implements Rules {
  public readonly range: Range;

  constructor() {
    this.range = new Range(-Infinity, Infinity);
  }

  public shouldInclude(n: number, tol = TOL): boolean {
    const equalsLower = almostEqual(this.range.lower, n);

    if (equalsLower) {
      return false;
    } else {
      return this.range.contains(n, tol);
    }
  }
}
