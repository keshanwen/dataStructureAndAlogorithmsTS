import { ArrayList } from '../linkedList/index';

export class Stack<E> {
  private list: ArrayList<E> = new ArrayList<E>();

  clear(): void {
    this.list.clear()
  }

  size():number {
    return this.list.size()
  }

  isEmpty(): boolean {
    return this.list.isEmpty()
  }

  push(element: E):void {
    this.list.add(element)
  }

  pop():E {
    return this.list.remove(this.list.size() - 1)
  }

  top(): E {
    return this.list.get(this.list.size() - 1)
  }

}