import { BST, Comparator } from './BST';
import { Node } from './BinaryTree';

export class BBST<E> extends BST<E> {
  constructor(comparator?: Comparator<E>) {
    super();
    this.comparator = comparator;
  }

  protected rotateLeft(grand: Node<E>): void {
    let parent: Node<E> = grand.right;
    let child: Node<E> = parent.left;
    grand.right = child;
    parent.left = grand;
    this.afterRotate(grand, parent, child);
  }

  protected rotateRight(grand: Node<E>): void {
    let parent: Node<E> = grand.left;
    let child: Node<E> = parent.right;

    grand.left = child;
    parent.right = grand;
    this.afterRotate(grand, parent, child);
  }

  protected afterRotate(grand: Node<E>, parent: Node<E>, child: Node<E>): void {
    // 让 parent 成为子树的根节点
    parent.parent = grand.parent;
    if (grand.isLeftChild()) {
      grand.parent.left = parent;
    } else if (grand.isRightChild()) {
      grand.parent.right = parent;
    } else {
      // grand 是 root 节点
      this._root = parent;
    }

    // 更新 child 的parent
    if (child) {
      child.parent = grand;
    }

    // 更新 grand 的 parent
    grand.parent = parent;
  }

  protected rotate(
    r: Node<E>, // 字树根节点
    b: Node<E>,
    c: Node<E>,
    d: Node<E>,
    e: Node<E>,
    f: Node<E>
  ): void {
    // 让 d 成为这颗字树的根节点
    d.parent = r.parent;
    if (r.isLeftChild()) {
      r.parent.left = d;
    } else if (r.isRightChild()) {
      r.parent.right = d;
    } else {
      this._root = d;
    }

    b.right = c;
    if (c) {
      c.parent = b;
    }


    f.left = e;
    if (e) {
      e.parent = f;
    }

    d.left = b;
    d.right = f;
    b.parent = d;
    f.parent = d;
  }
}