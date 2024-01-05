import { LinkedList } from '../linkedList/index';

export class Queue<E> {
  private list: LinkedList<E> = new LinkedList<E>()

  size():number {
    return this.list.size()
  }

  isEmpty():boolean {
    return this.list.isEmpty()
  }

  clear(): void {
    this.list.clear()
  }

  enQueue(element: E):void {
    this.list.add(element)
  }

  deQueue():E {
    return this.list.remove(0)
  }

  front(): E {
    return this.list.get(0)
  }
}