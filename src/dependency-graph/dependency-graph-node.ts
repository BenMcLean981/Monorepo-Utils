import { Equalable, haveSameItems } from '../haveSameItems';

export class DependencyGraphNode implements Equalable {
  private readonly _name: string;

  private readonly _dependencies: Set<string>;

  public constructor(name: string, dependencies: Iterable<string> = []) {
    this._name = name;
    this._dependencies = new Set(dependencies);
  }

  public get name(): string {
    return this._name;
  }

  public get dependencies(): Set<string> {
    return this._dependencies;
  }

  public addDependency(dependency: string): DependencyGraphNode {
    if (this._dependencies.has(dependency)) {
      throw new Error(
        `Node "${this.name}" already has dependency on "${dependency}".`,
      );
    }

    return new DependencyGraphNode(this.name, [
      ...this._dependencies,
      dependency,
    ]);
  }

  public equals(other: unknown): boolean {
    if (other instanceof DependencyGraphNode) {
      return (
        this._name === other._name &&
        haveSameItems(this._dependencies, other._dependencies)
      );
    } else {
      return false;
    }
  }
}
