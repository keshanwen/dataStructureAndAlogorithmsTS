import { BinaryTreeInfo } from './BinaryTreeInfo';
import { Queue } from '../queue/index';


interface Visitor<E> {
  stop?: Boolean;

  /**
   * @return 如果返回true，就代表停止遍历
   */
  visit(element: E): boolean;
}

export class Node<E> {
  element: E;
  parent: Node<E>;
  left: Node<E>;
  right: Node<E>;

  constructor(element: E, parent: Node<E>) {
    this.element = element;
    this.parent = parent;
  }

  isLeaf(): boolean {
    return this.left == null && this.right == null;
  }

  hasTwoChildren(): boolean {
    return this.left != null && this.right != null;
  }
}

export class BinaryTree<E> implements BinaryTreeInfo {
  protected _szie: number = 0;
  protected _root: Node<E>;

  size(): number {
    return this._szie;
  }

  isEmpty(): boolean {
    return this._szie === 0;
  }

  clear(): void {
    this._root = null;
    this._szie = 0;
  }

  root(): Object {
    return this._root;
  }

  left(node: Object): Object {
    return (<Node<E>>node).left;
  }

  right(node: Object): Object {
    return (<Node<E>>node).right;
  }

  string(node: Object): Object {
    let myNode: Node<E> = node as Node<E>;
    let parentString = 'null';
    if (myNode.parent) {
      parentString = myNode.parent.element.toString();
    }
    return myNode.element + '_p(' + parentString + ')';
  }

  preorder(visitor: Visitor<E>): void {
    if (!visitor) return;
    this._preorder(this._root, visitor);
  }

  private _preorder(node: Node<E>, visitor: Visitor<E>): void {
    if (!node || visitor.stop) return;

    visitor.stop = visitor.visit(node.element);
    this._preorder(node.left, visitor);
    this._preorder(node.right, visitor);
  }

  inorder(visitor: Visitor<E>): void {
    if (!visitor) return;
    this._inorder(this._root, visitor);
  }

  private _inorder(node: Node<E>, visitor: Visitor<E>): void {
    if (!node || visitor.stop) return;

    this._inorder(node.left, visitor);
    if (visitor.stop) return;
    visitor.stop = visitor.visit(node.element);
    this._inorder(node.right, visitor);
  }

  postorder(visitor: Visitor<E>): void {
    if (visitor == null) return;
    this._postorder(this._root, visitor);
  }

  _postorder(node: Node<E>, visitor: Visitor<E>): void {
    if (!node || visitor.stop) return;

    this._postorder(node.left, visitor);
    this._postorder(node.right, visitor);
    if (visitor.stop) return;
    visitor.stop = visitor.visit(node.element);
  }

  levelOrder(visitor: Visitor<E>): void {
    if (!this._root || !visitor) return;

    let queue: Queue<Node<E>> = new Queue<Node<E>>();
    queue.enQueue(this._root);

    while (!queue.isEmpty()) {
      let node: Node<E> = queue.deQueue();
      if (visitor.visit(node.element)) return;

      if (node.left) {
        queue.enQueue(node.left);
      }

      if (node.right) {
        queue.enQueue(node.right);
      }
    }
  }

  isComplete(): boolean {
    if (!this._root) return false;

    let queue: Queue<Node<E>> = new Queue<Node<E>>();
    queue.enQueue(this._root);

    let leaf = false;
    while (!queue.isEmpty()) {
      let node: Node<E> = queue.deQueue();
      if (leaf && !node.isLeaf()) return false;

      if (node.left) {
        queue.enQueue(node.left);
      } else if (node.right) {
        // node.left == null && node.right != null
        return false;
      }

      // 这里注意， 当 node.left !== null 时， 会到下面的逻辑中来
      if (node.right) {
        queue.enQueue(node.right);
      } else {
        // node.right === null
        leaf = true;
      }
    }

    return true;
  }

  predecessor(node: Node<E>): Node<E> {
    if (!this._root) return null;

    // 前驱节点在左字树当中 （left.right.right...）
    let p: Node<E> = node.left;
    if (p != null) {
      while (p.right != null) {
        p = p.right;
      }
      return p;
    }

    // 从父节点，祖父节点中寻找前驱节点
    while (node.parent != null && node == node.parent.left) {
      node = node.parent;
    }

    return node.parent;
  }

  successor(node: Node<E>): Node<E> {
    if (!this._root) return null;

    // 后继节点在右子树当中 （right.left.left.left......）
    let p: Node<E> = node.right;
    if (p != null) {
      while (p.left != null) {
        p = p.left;
      }
      return p;
    }

    // 从父节点，祖父节点中寻找后继节点
    while (node.parent != null && node == node.parent.right) {
      node = node.parent;
    }
    return node.parent;
  }

  height(): number {
    if (!this._root) return 0;

    let height = 0;
    let levelSize = 1;
    let queue: Queue<Node<E>> = new Queue<Node<E>>();
    queue.enQueue(this._root);

    while (!queue.isEmpty()) {
      let node: Node<E> = queue.deQueue();
      levelSize--;

      if (node.left) {
        queue.enQueue(node.left);
      }

      if (node.right) {
        queue.enQueue(node.right);
      }

      if (levelSize == 0) {
        // 意味着即将要访问下一层
        levelSize = queue.size();
        height++;
      }
    }

    return height;
  }

  height2(): number {
    return this._height(this._root);
  }

  _height(node: Node<E>): number {
    if (node == null) return 0;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  toString() {
    const h = this.height();
    const len = Math.pow(2, h);
    let levelSize = 1;
    let level = 1;
    let str = '';
    if (!this._root) {
      console.log('^ ^ empty');
      return;
    }
    let queue: Queue<Node<E>> = new Queue<Node<E>>();
    queue.enQueue(this._root);
    while (!queue.isEmpty()) {
      let node: Node<E> = queue.deQueue();
      levelSize--;
      let curLen = len / Math.pow(2, level - 1) + 1;
      str +=
        '  '.repeat(curLen) +
        `${node.element}-[${node.parent ? node.parent.element : null}]`;

      if (node.left) {
        queue.enQueue(node.left);
      }

      if (node.right) {
        queue.enQueue(node.right);
      }

      if (levelSize == 0) {
        // 意味着即将要访问下一层
        levelSize = queue.size();
        str += '  '.repeat(curLen) + '\n';
        level++;
      }
    }

    console.log(str);
  }
}
