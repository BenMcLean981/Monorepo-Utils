import * as JSON5 from 'json5';
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

  public addReference(reference: Reference): TsConfig {
    return new TsConfig({
      references: [...this._references, reference],
      additionalData: this._additionalData,
    });
  }

  public static parse(s: string): TsConfig {
    const json = JSON5.parse(s);

    const references = json.references.map(
      (r: Record<string, string>) => new Reference(r.path),
    );

    const additionalData = { ...json };
    delete additionalData['references'];

    return new TsConfig({
      references,
      additionalData,
    });
  }

  public format(): string {
    const json = {
      references: this._references.map((r) => ({ path: r.path })),
      ...this._additionalData,
    };

    return JSON5.stringify(json);
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
