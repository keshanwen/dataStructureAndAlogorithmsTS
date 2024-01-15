import { LinkedList } from '../linkedList/index'
import { Set, Visitor } from './Set'

export class ListSet<E> implements Set<E> {
  list: LinkedList<E> = new LinkedList<E>();

  size(): number {
    return this.list.size();
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  clear(): void {
    this.list.clear()
  }

  contains(element: E): boolean {
    return this.list.contains(element)
  }

  add(element: E): void {
    let index = this.list.indexOf(element)
    if (index != this.list.ELEMENT_NOT_FOUND) {
      this.list.set(index, element) // 存在就覆盖
    } else {
      this.list.add(element) // 不存在就添加
    }
  }
  remove(element: E): void {
    let index = this.list.indexOf(element)
    if (index != this.list.ELEMENT_NOT_FOUND) {
      this.list.remove(index)
    }
  }
  traversal(visitor: Visitor<E>): void {
    if (!visitor) return

    let size = this.list.size()
    for (let i = 0; i < size; i++) {
      if (visitor.visit(this.list.get(i))) return
    }
  }
}