import { BinaryHeap } from '../heap/index'
import { Comparator } from '../heap/AbstractHeap'

export class PriorityQueue<E> {
  private heap: BinaryHeap<E>;

  constructor(comparator?: Comparator<E>) {
    this.heap = new BinaryHeap<E>(comparator);
  }

  size(): number {
    return this.heap.size();
  }

  isEmpty(): boolean {
    return this.heap.isEmpty()
  }

  clear(): void {
    return this.heap.clear()
  }

  enQueue(element: E): void {
    this.heap.add(element)
  }

  deQueue(): E {
    return this.heap.remove()
  }

  front(): E {
    return this.heap.get()
  }
}

