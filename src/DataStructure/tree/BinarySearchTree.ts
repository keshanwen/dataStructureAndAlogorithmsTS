import { BinaryTreeInfo } from './BinaryTreeInfo'
import { Queue } from '../queue/index'

interface Comparator<E> {
  compare(e1:E,e2:E): number
}

interface Visitor<E> {
  stop?: Boolean;

  /**
   * @return 如果返回true，就代表停止遍历
   */
  visit(element: E): boolean;
}


class Node<E> {
  element: E;
  parent: Node<E>;
  left: Node<E>;
  right: Node<E>;

  constructor(element: E, parent: Node<E>) {
    this.element = element;
    this.parent = parent;
  }

  isLeaf(): boolean {
    return this.left == null && this.right == null
  }

  hasTwoChildren():boolean {
    return this.left != null && this.right != null
  }
}

export class BinarySearchTree<E> implements BinaryTreeInfo {
  private _szie: number = 0;
  private _root: Node<E>;
  private comparator: Comparator<E>;

  constructor(comparator?: Comparator<E>) {
    this.comparator = comparator;
  }

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
  /**
   * @return 返回值等于0，代表e1和e2相等；返回值大于0，代表e1大于e2；返回值小于于0，代表e1小于e2
   */
  private compare(e1: E, e2: E): number {
    if (this.comparator) {
      return this.comparator.compare(e1, e2);
    }
    return e1 - e2;
  }

  elementNotNullCheck(element: E): void {
    if (element === null || element === undefined) {
      throw new Error('element must not be null');
    }
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

  add(element: E): void {
    this.elementNotNullCheck(element);

    // 添加第一个节点
    if (!this._root) {
      this._root = new Node<E>(element, null);
      this._szie++;
      return;
    }

    // 添加的不是第一个节点， 找到父节点
    let parent: Node<E> = this._root;
    let node: Node<E> = this._root;
    let cmp: number = 0;

    do {
      cmp = this.compare(element, node.element);
      parent = node; // 记录父节点，这很重要， 因为下面根据父节点插入新的节点
      if (cmp > 0) {
        node = node.right;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        node.element = element;
        return;
      }
    } while (node);

    // 看看插入到父节点的哪个位置
    let newNode: Node<E> = new Node<E>(element, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this._szie++;
  }

  private node(element: E): Node<E> {
    let node: Node<E> = this._root;
    while (node) {
      let cmp = this.compare(element, node.element);
      if (cmp === 0) return node;
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return null;
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
    if (!this._root) return false

    let queue: Queue<Node<E>> = new Queue<Node<E>>()
    queue.enQueue(this._root)

    let leaf = false
    while (!queue.isEmpty()) {
      let node: Node<E> = queue.deQueue()
      if (leaf && !node.isLeaf()) return false

      if (node.left) {
        queue.enQueue(node.left)
      } else if (node.right) {
        // node.left == null && node.right != null
        return false;
      }

      // 这里注意， 当 node.left !== null 时， 会到下面的逻辑中来
      if (node.right) {
        queue.enQueue(node.right)
      } else { // node.right === null
        leaf = true
      }
    }

    return true
  }

  predecessor(node: Node<E>): Node<E> {
    if (!this._root) return null

    // 前驱节点在左字树当中 （left.right.right...）
    let p: Node<E> = node.left
    if (p != null) {
      while (p.right != null) {
        p = p.right
      }
      return p
    }

    // 从父节点，祖父节点中寻找前驱节点
    while (node.parent != null && node == node.parent.left) {
      node = node.parent
    }

    return node.parent
  }

  successor(node: Node<E>): Node<E> {
    if (!this._root) return null

    // 后继节点在右子树当中 （right.left.left.left......）
    let p: Node<E> = node.right
    if (p != null) {
      while (p.left != null) {
        p = p.left
      }
      return p
    }

    // 从父节点，祖父节点中寻找后继节点
    while (node.parent != null && node == node.parent.right) {
      node = node.parent
    }
    return node.parent
  }

  height(): number {
    if (!this._root) return 0;

    let height = 0;
    let levelSize = 1;
    let queue: Queue<Node<E>> = new Queue<Node<E>>()
    queue.enQueue(this._root)

    while (!queue.isEmpty()) {
      let node: Node<E> = queue.deQueue()
      levelSize--

      if (node.left) {
        queue.enQueue(node.left)
      }

      if (node.right) {
        queue.enQueue(node.right)
      }

      if (levelSize == 0) { // 意味着即将要访问下一层
        levelSize = queue.size()
        height++
      }
    }

    return height
  }

  height2(): number {
    return this._height(this._root)
  }

  _height(node: Node<E>): number {
    if (node == null) return 0
    return 1 + Math.max(this._height(node.left),this._height(node.right))
  }

  remove(element: E): void {
    this._remove(this.node(element))
  }

  contains(element: E): boolean {
    return this.node(element) != null
  }

  private _remove(node: Node<E>) {
    if (node == null) return
    this._szie--

    // 度为2 的节点
    if (node.hasTwoChildren()) {
      // 找到后继节点
      let s: Node<E> = this.successor(node)
      // 用后继节点的值覆盖度为 2 的节点
      node.element = s.element
      // 删除后继节点（这里有点难以理解， 将 s 指向 node, 因为下面会对 node 操作， 其实就是对 s 后继节点的操作）
      node = s
    }
    // 删除 node 节点（node 的读必然是1 或者是0）（这里为什么是 0 或者是1 呢？ 如果度为2那么进入上面那段逻辑，将后继节点赋值给了node, 而后继节点必然是读为 1 或者 0 的节点）
    let replacement: Node<E> = node.left != null ? node.left : node.right

    if (replacement != null) { // node 是度为 1 的节点
      // 更改 parent
      replacement.parent = node.parent
      // 更改 parent 的left ， right 指向
      if (node.parent != null) {  // node 是度为1的节点，并且是根节点
        this._root = replacement
      } else if (node == node.parent.left) {
        node.parent.left = replacement
      } else {
        node.parent.right = replacement
      }
    } else if (node.parent == null) { // node 是叶子节点并且是根节点
      this._root = null
    } else { // node 是叶子节点， 但不是更节点
      if (node == node.parent.left) {
        node.parent.left = null
      } else {
        // node = node.parent.right
        node.parent.right = null;
      }
    }
  }

  toString() {
    const h = this.height()
    const len = Math.pow(2, h)
    let levelSize = 1;
    let level = 1
    let str = ''
    if (!this._root) {
      console.log('^ ^ empty')
      return
    }
    let queue: Queue<Node<E>> = new Queue<Node<E>>()
    queue.enQueue(this._root)
    while (!queue.isEmpty()) {
       let node: Node<E> = queue.deQueue();
      levelSize--;
      let curLen = len / Math.pow(2, level -1) + 1;
      str +=  '  '.repeat(curLen) + `${node.element}-[${node.parent ?  node.parent.element : null}]`;

       if (node.left) {
         queue.enQueue(node.left);
       }

       if (node.right) {
         queue.enQueue(node.right);
      }



       if (levelSize == 0) {
         // 意味着即将要访问下一层
         levelSize = queue.size();
         str += '  '.repeat(curLen) + '\n'
         level++
       }
     }


    console.log(str)
  }

}