import { isEqual } from 'lodash';
import { Equalable, haveSameItems } from '../haveSameItems';
import { Snapshot } from '../snapshot';
import { Reference } from './reference';

export class TsConfig implements Equalable {
  private readonly _references: ReadonlyArray<Reference>;

  private readonly _additionalData: Snapshot;

  public constructor(args?: {
    references?: ReadonlyArray<Reference>;
    additionalData?: Snapshot;
  }) {
    this._references = args?.references ?? [];
    this._additionalData = args?.additionalData ?? {};
  }

  public equals(other: unknown): boolean {
    if (other instanceof TsConfig) {
      const sameReferences = haveSameItems(
        this._references,
        other._references,
        (r1, r2) => r1.equals(r2),
      );

      return (
        sameReferences && isEqual(this._additionalData, other._additionalData)
      );
    } else {
      return false;
    }
  }
}
