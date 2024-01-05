import { LinkedList } from '../linkedList/index';

export class Deque<E> {
  private list: LinkedList<E> = new LinkedList<E>();

  size(): number {
    return this.list.size();
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  clear(): void {
    this.list.clear();
  }

  enQueueRear(element: E):void {
    this.list.add(element)
  }

  deQueueFront(): E {
    return this.list.remove(0)
  }

  enQueueFront(element: E): void {
    this.list.add(0, element)
  }

  deQueueRear():E {
    return this.list.remove(this.list.size() -1)
  }

  front(): E {
    return this.list.get(0)
  }

  rear(): E {
    return this.list.get(this.list.size() -1)
  }
}