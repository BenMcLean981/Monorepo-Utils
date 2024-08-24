import { describe, expect, it } from 'vitest';
import { Reference } from '../reference';
import { TsConfig } from '../ts-config';

describe('TsConfig', () => {
  describe('equals', () => {
    it('Returns true for equal.', () => {
      const t1 = new TsConfig({
        references: [new Reference('../foo')],
      });
      const t2 = new TsConfig({
        references: [new Reference('../foo')],
      });

      expect(t1.equals(t2)).toBe(true);
    });

    it('Returns false for different references.', () => {
      const t1 = new TsConfig({
        references: [new Reference('../foo')],
      });
      const t2 = new TsConfig({
        references: [new Reference('../bar')],
      });

      expect(t1.equals(t2)).toBe(false);
    });

    it('Returns false for different additionalData.', () => {
      const t1 = new TsConfig({
        references: [new Reference('../foo')],
        additionalData: { compilerOptions: { strict: true } },
      });
      const t2 = new TsConfig({
        references: [new Reference('../foo')],
        additionalData: { compilerOptions: { strict: false } },
      });

      expect(t1.equals(t2)).toBe(false);
    });

    it('Returns false for different types.', () => {
      const t = new TsConfig({
        references: [new Reference('../foo')],
        additionalData: { compilerOptions: { strict: true } },
      });

      expect(t.equals(undefined)).toBe(false);
    });
  });
});
