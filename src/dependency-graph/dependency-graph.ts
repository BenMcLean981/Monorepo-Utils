import { DependencyGraphNode } from './dependency-graph-node';

export class DependencyGraph {
  private readonly nodes: ReadonlyArray<DependencyGraphNode>;

  private constructor(nodes: ReadonlyArray<DependencyGraphNode> = []) {
    this.nodes = nodes;
  }

  public static makeGraph(nodes: ReadonlyArray<DependencyGraphNode>) {
    return nodes.reduce(
      (graph, node) => graph.addNode(node),
      new DependencyGraph(),
    );
  }

  private addNode(node: DependencyGraphNode): DependencyGraph {
    if (this.contains(node.name)) {
      throw new Error(`Graph already contains node "${node.name}".`);
    }

    return new DependencyGraph([...this.nodes, node]);
  }

  private contains(name: string): boolean {
    return this.tryGettingNode(name) !== undefined;
  }

  public getNode(name: string): DependencyGraphNode {
    const result = this.tryGettingNode(name);

    if (result === undefined) {
      throw new Error(`Graph does not contain node "${name}".`);
    }

    return result;
  }
  private tryGettingNode(name: string): DependencyGraphNode | undefined {
    return this.nodes.find((n) => n.name === name);
  }
}
