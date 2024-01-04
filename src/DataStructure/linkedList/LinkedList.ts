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

export class LinkedList<E> extends AbstractList<E> {
  private first: Node<E>;
  private last: Node<E>;

  /**
   * 获取index位置对应的节点对象
   * @param index
   * @return
   */
  private node(index: number): Node<E> {
    this.rangeCheck(index);

    if (index < this._size >> 1) {
      let node: Node<E> = this.first;
      for (let i = 0; i < index; i++) {
        node = node?.next;
      }
      return node;
    } else {
      let node: Node<E> = this.last;
      for (let i = this._size - 1; i > index; i--) {
        node = node?.prev;
      }
      return node;
    }
  }

  clear(): void {
    this._size = 0;
    this.first = null;
    this.last = null;
  }

  get(index: number): E {
    return this.node(index)?.element;
  }

  set(index: number, element: E): E {
    let node: Node<E> = this.node(index);
    let old: E = node?.element;
    node!.element = element;
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
      let oldLast: Node<E> = this.last;
      this.last = new Node<any>(oldLast, element, null);
      if (oldLast == null) {
        this.first = this.last;
      } else {
        oldLast.next = this.last;
      }
    } else {
      let next = this.node(index as number);
      let prev = next.prev;
      let node = new Node<any>(prev, element, next);
      next.prev = node;

      if (prev === null || prev === undefined) {
        this.first = node;
      } else {
        prev.next = node;
      }
    }
    this._size++;
  }

  remove(index: number): E {
    this.rangeCheck(index);

    let node: Node<E> = this.node(index);
    let prev: Node<E> = node.prev;
    let next: Node<E> = node.next;

    if (prev == null) {
      this.first = next;
    } else {
      prev.next = next;
    }

    if (next == null) {
      this.last = prev;
    } else {
      next.prev = prev;
    }

    this._size--;
    return node.element;
  }

  indexOf(element: E): number {
    if (element == null) {
      let node: Node<E> = this.first;
      for (let i = 0; i < this._size; i++) {
        if (node.element == null) return i;
        node = node.next;
      }
    } else {
      let node: Node<E> = this.first;
      for (let i = 0; i < this._size; i++) {
        // 这里待优化， 应该给 element 提供一个 element.equals(node.element)
        if (element === node.element) return i;

        node = node.next;
      }
    }

    return this.ELEMENT_NOT_FOUND;
  }

  toString() {
    let str = '';
    str += `size: [${this._size}] \n`;

    for (let i = 0; i < this._size; i++) {
      str += `index: [${i}] element: [${
        this.node(i).element
      }] ------------->`;
    }

    console.log(str);
    console.log(this.first, 'first~~~~~~~~~~~~~');
    console.log(this.last, 'last~~~~~~~~~~~~~~~');
  }
}
