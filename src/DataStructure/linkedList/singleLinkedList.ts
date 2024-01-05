import AbstractList from './AbstractList';

class Node<E> {
  element: E;
  next: Node<E>;

  constructor(element: E, next: Node<E>) {
    this.element = element;
    this.next = next;
  }
}


export class SignleLinkedList<E> extends AbstractList<E> {
  private first: Node<E>;

  constructor() {
    super();
    // 增加一个虚拟节点
    this.first = new Node<any>(null, null);
  }

  clear(): void {
    this._size = 0;
    this.first = null;
  }

  get(index: number): E {
    return this.node(index).element;
  }

  set(index: number, element: E): E {
    let node = this.node(index);
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

    let prev = index == 0 ? this.first : this.node(index - 1);
    prev.next = new Node<any>(element, prev.next);
    this._size++;
  }

  remove(index: number): E {
    this.rangeCheck(index);

    let prev: Node<E> = index === 0 ? this.first : this.node(index - 1);
    let node = prev.next;
    prev.next = node.next;

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

    let node: Node<E> = this.first.next;
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