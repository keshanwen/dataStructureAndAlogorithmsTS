import { TreeMap } from '../../DataStructure/map/index';

class Node<V> {
  value: V
  parent: Node<V> = this
  rank: number = 1
  constructor(value: V) {
    this.value = value
  }
}

export class GenericUnionFind<V> {
  private nodes: TreeMap<V, Node<V>> = new TreeMap<V, Node<V>>();

  public makeSet(v: V): void {
    if (this.nodes.containsKey(v)) return;
    this.nodes.put(v, new Node<V>(v));
  }

  /**
   * 找出v的根节点
  */
  private findNode(v: V): Node<V> {
    let node: Node<V> = this.nodes.get(v)
    if (!node) return null
    while (node.value !== node.parent.value) {
      node.parent = node.parent.parent
      node = node.parent
    }
    return node
  }

  public find(v: V): V {
    let node: Node<V> = this.findNode(v)
    return node ? node.value : null
  }

  public union(v1: V, v2: V): void {
    let p1: Node<V> = this.findNode(v1)
    let p2: Node<V> = this.findNode(v2)
    if (!p1 || !p2) return
    if (p1.value == p2.value) return

    if (p1.rank < p2.rank) {
      p1.parent = p2
    } else if (p1.rank > p2.rank) {
      p2.parent = p1
    } else {
      p1.parent = p2
      p2.rank += 1
    }
  }

  public isSame(v1: V, v2: V): boolean {
    return this.find(v1) === this.find(v2)
  }
}