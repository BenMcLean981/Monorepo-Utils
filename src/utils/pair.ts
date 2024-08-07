export class Pair<T> {
  public readonly item1: T;

  public readonly item2: T;

  constructor(item1: T, item2: T) {
    this.item1 = item1;
    this.item2 = item2;
  }

  static makePairs<T>(items: T[]): Array<Pair<T>> {
    if (items.length === 1) {
      throw new Error('Cannot make pairs with one item.');
    }

    const results: Array<Pair<T>> = [];

    for (let i = 0; i < items.length - 1; i++) {
      const pair = new Pair(items[i], items[i + 1]);
      results.push(pair);
    }

    return results;
  }
}
