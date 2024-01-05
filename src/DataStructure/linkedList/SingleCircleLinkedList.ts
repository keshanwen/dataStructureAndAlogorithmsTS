import AbstractList from './AbstractList';

class Node<E> {
  element: E;
  next: Node<E>;

  constructor(element: E, next: Node<E>) {
    this.element = element;
    this.next = next;
  }
}

export class SingleCircleLinkedList<E> extends AbstractList<E> {
  private first: Node<E>;

  clear(): void {
    this._size = 0;
    this.first = null;
  }

  get(index: number): E {
    return this.node(index).element;
  }

  set(index: number, element: E): E {
    let node: Node<E> = this.node(index);
    let old: E = node.element;
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

    if (index == 0) {
      let newFirst = new Node<any>(element, this.first);
      // 拿到最后一个节点
      let last = this._size === 0 ? newFirst : this.node(this._size - 1);
      last.next = newFirst;
      this.first = newFirst;
    } else {
      let prev: Node<E> = this.node(index - 1);
      prev.next = new Node<any>(element, prev.next);
    }
    this._size++;
  }

  remove(index: number): E {
    this.rangeCheck(index);

    let node: Node<E> = this.first;
    if (index === 0) {
      if (this._size === 1) {
        this.first = null;
      } else {
        let last: Node<E> = this.node(this._size - 1);
        this.first = this.first.next;
        last.next = this.first;
      }
    } else {
      let prev: Node<E> = this.node(index - 1);
      node = prev.next;
      prev.next = node.next;
    }
    this._size--;
    return node.element;
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
  private node(index: number): Node<E> {
    this.rangeCheck(index);

    let node: Node<E> = this.first;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }

    return node;
  }

  toString() {
    let str = '';
    str += `size: [${this._size}] \n`;

    for (let i = 0; i < this._size; i++) {
      str += `index: [${i}] element: [${this.node(i).element}] ------------->`;
    }

    console.log(str);
    console.log(this.first, 'first~~~~~~~~~~~~~');
  }
}