import { describe, expect, it } from 'vitest';
import { Reference } from '../reference';
import { TsConfig } from '../ts-config';

describe('TsConfig', () => {
  describe('parse', () => {
    it('Parses a tsconfig.json file.', () => {
      const actual = TsConfig.parse(rawString);
      const expected = new TsConfig({
        references: [
          new Reference('../foo'),
          new Reference('../bar/tsconfig.lib.json'),
        ],
        additionalData: {
          compilerOptions: {
            outDir: 'dist',
          },
          include: ['src'],
          exclude: ['node_modules', 'dist'],
        },
      });

      expect(actual.equals(expected)).toBe(true);
    });
  });

  describe('format', () => {
    it('formats to the same string it parsed from.', () => {
      const original = TsConfig.parse(rawString);

      const formatted = original.format();
      const parsed = TsConfig.parse(formatted);

      expect(parsed.equals(original)).toBe(true);
    });
  });

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

const rawString = `
{
  "compilerOptions": {
    "outDir": "dist",
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"],
  "references": [
    { "path": "../foo" },
    { "path": "../bar/tsconfig.lib.json" }
  ]
}
`;
