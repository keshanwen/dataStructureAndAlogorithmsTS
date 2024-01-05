import AbstractList from './AbstractList';

class Node<E> {
  element: E;
  prev: Node<E>;
  next: Node<E>;

  constructor(prev: Node<E>, element: E, next: Node<E>) {
    this.prev = prev;
    this.element = element;
    this.next = next;
  }
}

export class CircleLinkedList<E> extends AbstractList<E> {
  private first: Node<E>;
  private last: Node<E>;
  private current: Node<E>;

  reset(): void {
    this.current = this.first;
  }

  next(): E {
    if (this.current === null) return null;

    this.current = this.current.next;
    return this.current.element;
  }

  clear(): void {
    this._size = 0;
    this.first = null;
    this.last = null;
  }

  get(index: number): E {
    return this.node(index).element;
  }

  set(index: number, element: E): E {
    let node: Node<E> = this.node(index);
    let old = node.element;
    node.element = element;
    return old;
  }

  add(element: E): void;
  add(index: number, element: E): void;
  add(index: unknown, element?: unknown): void {
    if (!element) {
      element = index;
      index = this._size;
    }
    this.rangeCheckForAdd(index as number);

    if (index === this._size) {
      // 往最后面添加元素
      let oldLast: Node<E> = this.last;
      this.last = new Node<any>(oldLast, element, this.first);
      if (oldLast === null || oldLast === undefined) {
        // 这是链表中的第一个元素
        this.first = this.last;
        this.first.next = this.first;
        this.first.prev = this.first;
      } else {
        oldLast.next = this.last;
        this.first.prev = this.last;
      }
    } else {
      let next: Node<E> = this.node(index as number);
      let prev: Node<E> = next.prev;
      let node: Node<E> = new Node<any>(prev, element, next);
      next.prev = node;
      prev.next = node;

      if (next === this.first) {
        // index === 0
        this.first = node;
      }
    }
    this._size++;
  }

  remove(index: number): E {
    if (index === undefined || index === null) {
      if (this.current === null) return null;
      let next: Node<E> = this.current.next;
      let element: E = this._remove(this.current);
      if (this._size === 0) {
        this.current = null;
      } else {
        this.current = next;
      }
      return element;
    } else {
      this.rangeCheck(index);
      return this._remove(this.node(index));
    }
  }

  private _remove(node: Node<E>): E {
    if (this._size == 1) {
      this.first = null;
      this.last = null;
    } else {
      let prev: Node<E> = node.prev;
      let next: Node<E> = node.next;
      prev.next = next;
      next.prev = prev;

      if (node === this.first) {
        // index == 0
        this.first = next;
      }

      if (node === this.last) {
        // index = this._size - 1
        this.last = prev;
      }

      this._size--;
      return node.element;
    }
  }

  indexOf(element: E): number {
    if (element === null) {
      let node: Node<E> = this.first;
      for (let i = 0; i < this._size; i++) {
        if (node.element === null) return i;

        node = node.next;
      }
    } else {
      let node: Node<E> = this.first;
      for (let i = 0; i < this._size; i++) {
        if (element === node.element) return i;

        node = node.next;
      }
    }

    return this.ELEMENT_NOT_FOUND;
  }

  /**
   * 获取index位置对应的节点对象
   * @param index
   * @return
   */
  node(index: number): Node<E> {
    this.rangeCheck(index);

    if (index < this._size >> 1) {
      let node: Node<E> = this.first;
      for (let i = 0; i < index; i++) {
        node = node.next;
      }
      return node;
    } else {
      let node: Node<E> = this.last;
      for (let i = this._size - 1; i > index; i--) {
        node = node.prev;
      }
      return node;
    }
  }

  toString() {
    let str = '';
    str += `size: [${this._size}] \n`;

    for (let i = 0; i < this._size; i++) {
      str += `index: (${i}) element: [${this.node(i).element}] ------------->`;
    }

    console.log(str);
    console.log(this.first, 'first~~~~~~~~~~~~~');
    console.log(this.last, 'last~~~~~~~~~~~~~~~');
  }
}