import { Set, Visitor } from './Set'
import { RBTree } from '../tree/index'
import { Comparator } from '../tree/BST'

export class TreeSet<E> implements Set<E> {
  tree: RBTree<E>;

  constructor(comparator?: Comparator<E>) {
    this.tree = new RBTree<E>(comparator)
  }
  size(): number {
    return this.tree.size()
  }
  isEmpty(): boolean {
    return this.tree.isEmpty()
  }
  clear(): void {
    this.tree.clear()
  }

  contains(element: E): boolean {
    return this.tree.contains(element)
  }

  add(element: E): void {
    this.tree.add(element)
  }

  remove(element: E): void {
    this.tree.remove(element)
  }
  traversal(visitor: Visitor<E>): void {
    this.tree.inorder({
      visit(element) {
          return visitor.visit(element)
      },
    })
  }
}