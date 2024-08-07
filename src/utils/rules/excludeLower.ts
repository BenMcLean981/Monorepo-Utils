import { TOL } from '../../tol';
import { almostEqual } from '../equality/equalityChecks';
import { Range } from '../range/range';
import { Rules } from './rules.interface';

export class ExcludeLower implements Rules {
  public readonly range: Range;

  constructor(range: Range) {
    this.range = range;
  }

  public static makeRange(lower: number, upper: number): ExcludeLower {
    const range = new Range(lower, upper);

    return new ExcludeLower(range);
  }

  public shouldInclude(n: number, tol = TOL): boolean {
    const equalsLower = almostEqual(this.range.lower, n, tol);

    if (equalsLower) {
      return false;
    } else {
      return this.range.contains(n, tol);
    }
  }
}
