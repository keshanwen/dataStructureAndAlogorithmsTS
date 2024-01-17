import { Heap } from './Heap'

export interface Comparator<E> {
  compare(e1: E, e2: E): number;
}


export abstract class AbstractHeap<E> implements Heap<E> {
  protected _size: number = 0;
  protected comparator?: Comparator<E>;

  constructor(comparator?: Comparator<E>) {
    this.comparator = comparator
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size == 0
  }

  compare(e1: E, e2: E): number {
    if (this.comparator) {
      return this.comparator.compare(e1, e2)
    }
    return (e1 as number) - (e2 as number)
  }

  clear(): void {
    throw new Error('Method not implemented.');
  }

  add(element: E): void {
    throw new Error('Method not implemented.');
  }

  get(): E {
    throw new Error('Method not implemented.');
  }

  remove(): E {
    throw new Error('Method not implemented.');
  }

  replace(element: E): E {
    throw new Error('Method not implemented.');
  }
}