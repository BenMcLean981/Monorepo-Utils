import { beforeEach, describe, expect, it } from 'vitest';
import { PackageJson } from '..';
import { Dependency } from '../dependency';

describe('PackageJson', () => {
  let dep1: Dependency;
  let dep2: Dependency;
  let dep3: Dependency;

  beforeEach(() => {
    dep1 = new Dependency('dep1', '0.0.0');
    dep2 = new Dependency('dep2', '0.0.0');
    dep3 = new Dependency('dep3', '0.0.0');
  });

  describe('equals', () => {
    it('Returns true for equal.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        workspaces: ['w1', 'w2'],
      });
      const p2 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        workspaces: ['w2', 'w1'],
      });

      expect(p1.equals(p2)).toBe(true);
    });

    it('Returns false for different names.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        workspaces: ['w1', 'w2'],
      });
      const p2 = new PackageJson({
        name: 'bar',
        dependencies: [dep1],
        devDependencies: [dep2],
        workspaces: ['w1', 'w2'],
      });

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different dependencies.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        workspaces: ['w1', 'w2'],
      });
      const p2 = new PackageJson({
        name: 'foo',
        dependencies: [dep3],
        devDependencies: [dep2],
        workspaces: ['w1', 'w2'],
      });

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different devDependencies.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        workspaces: ['w1', 'w2'],
      });
      const p2 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep3],
        workspaces: ['w1', 'w2'],
      });

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different workspaces.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        workspaces: ['w1', 'w2'],
      });
      const p2 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        workspaces: ['w1', 'w3'],
      });

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different additionalData.', () => {
      const p1 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        additionalData: { private: 'true' },
      });
      const p2 = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        additionalData: { private: 'false' },
      });

      expect(p1.equals(p2)).toBe(false);
    });

    it('Returns false for different types.', () => {
      const p = new PackageJson({
        name: 'foo',
        dependencies: [dep1],
        devDependencies: [dep2],
        additionalData: { private: 'true' },
      });

      expect(p.equals(undefined)).toBe(false);
    });
  });

  describe('parse', () => {
    it('Parses a package.json file.', () => {
      const actual = PackageJson.parse(rawString);
      const expected = new PackageJson({
        name: 'monorepo-utils',
        dependencies: [
          new Dependency('json5', '^2.2.3'),
          new Dependency('lodash', '^4.17.21'),
        ],
        devDependencies: [
          new Dependency('@eslint/js', '^9.8.0'),
          new Dependency('@rollup/plugin-typescript', '^11.1.6'),
          new Dependency('@types/eslint__js', '^8.42.3'),
          new Dependency('@types/lodash', '^4.17.7'),
          new Dependency('@types/node', '^22.1.0'),
          new Dependency('eslint', '9.x'),
          new Dependency('eslint-config-prettier', '^9.1.0'),
          new Dependency('eslint-plugin-prettier', '^5.2.1'),
          new Dependency('globals', '^15.9.0'),
          new Dependency('prettier', '^3.3.3'),
          new Dependency('typescript', '^5.5.4'),
          new Dependency('typescript-eslint', '^8.0.1'),
          new Dependency('vite', '^5.3.5'),
          new Dependency('vite-plugin-dts', '^4.0.1'),
          new Dependency('vitest', '^2.0.5'),
        ],
        workspaces: ['w1', 'w2'],
        additionalData: {
          version: '0.0.0',
          description:
            'An opinionated set of utilities for working with a monorepo.',
          main: 'dist/cjs/index.js',
          exports: {
            require: './dist/cjs/index.js',
            import: './dist/esm/index.js',
          },
          scripts: {
            build: 'vite build',
            test: 'vitest run',
            'test:watch': 'vitest',
            lint: 'eslint .',
            format: 'prettier --write .',
          },
          repository: {
            type: 'git',
            url: 'git+https://github.com/BenMcLean981/Monorepo-Utils.git',
          },
          keywords: ['monorepo', 'typescript', 'workspaces'],
          author: 'Ben McLean',
          license: 'MIT',
          bugs: {
            url: 'https://github.com/BenMcLean981/Monorepo-Utils/issues',
          },
          homepage: 'https://github.com/BenMcLean981/Monorepo-Utils#readme',
        },
      });

      expect(actual.equals(expected)).toBe(true);
    });
  });

  describe('format', () => {
    it('formats to the same string it parsed from.', () => {
      const original = PackageJson.parse(rawString);

      const formatted = original.format();
      const parsed = PackageJson.parse(formatted);

      expect(parsed.equals(original)).toBe(true);
    });
  });
});

const rawString = `{
  "name": "monorepo-utils",
  "version": "0.0.0",
  "description": "An opinionated set of utilities for working with a monorepo.",
  "main": "dist/cjs/index.js",
  "exports": {
    "require": "./dist/cjs/index.js",
    "import": "./dist/esm/index.js"
  },
  "scripts": {
    "build": "vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/BenMcLean981/Monorepo-Utils.git"
  },
  "keywords": [
    "monorepo",
    "typescript",
    "workspaces"
  ],
  "author": "Ben McLean",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/BenMcLean981/Monorepo-Utils/issues"
  },
  "homepage": "https://github.com/BenMcLean981/Monorepo-Utils#readme",
  "devDependencies": {
    "@eslint/js": "^9.8.0",
    "@rollup/plugin-typescript": "^11.1.6",
    "@types/eslint__js": "^8.42.3",
    "@types/lodash": "^4.17.7",
    "@types/node": "^22.1.0",
    "eslint": "9.x",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "globals": "^15.9.0",
    "prettier": "^3.3.3",
    "typescript": "^5.5.4",
    "typescript-eslint": "^8.0.1",
    "vite": "^5.3.5",
    "vite-plugin-dts": "^4.0.1",
    "vitest": "^2.0.5"
  },
  "dependencies": {
    "lodash": "^4.17.21",
    "json5": "^2.2.3",
  },
  "workspaces": ["w1", "w2"]
}
`;
