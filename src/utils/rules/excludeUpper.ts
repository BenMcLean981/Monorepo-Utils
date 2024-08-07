import { TOL } from '../../tol';
import { almostEqual } from '../equality/equalityChecks';
import { Range } from '../range/range';
import { Rules } from './rules.interface';

export class ExcludeUpper implements Rules {
  public readonly range: Range;

  constructor(range: Range) {
    this.range = range;
  }

  public static makeRange(lower: number, upper: number): ExcludeUpper {
    const range = new Range(lower, upper);

    return new ExcludeUpper(range);
  }

  public shouldInclude(n: number, tol = TOL): boolean {
    const equalsUpper = almostEqual(this.range.upper, n, tol);

    if (equalsUpper) {
      return false;
    } else {
      return this.range.contains(n, tol);
    }
  }
}
