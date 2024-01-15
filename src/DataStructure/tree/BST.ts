import { BinaryTree, Node } from './BinaryTree';

export interface Comparator<E> {
  compare(e1: E, e2: E): number;
}

export class BST<E> extends BinaryTree<E> {
  comparator: Comparator<E>;

  constructor(comparator?: Comparator<E>) {
    super();
    this.comparator = comparator;
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

  add(element: E): void {
    this.elementNotNullCheck(element);

    // 添加第一个节点
    if (!this._root) {
      this._root = this.createNode(element, null)
      this._szie++;

      // 新添加节点之后的处理
      this.afterAdd(this._root)
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
    let newNode: Node<E> = this.createNode(element, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this._szie++;

    // 新添加节点之后的处理
    this.afterAdd(newNode)
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

  private _remove(node: Node<E>) {
    if (node == null) return;
    this._szie--;

    // 度为2 的节点
    if (node.hasTwoChildren()) {
      // 找到后继节点
      let s: Node<E> = this.successor(node);
      // 用后继节点的值覆盖度为 2 的节点
      node.element = s.element;
      // 删除后继节点（这里有点难以理解， 将 s 指向 node, 因为下面会对 node 操作， 其实就是对 s 后继节点的操作）
      node = s;
    }
    // 删除 node 节点（node 的读必然是1 或者是0）（这里为什么是 0 或者是1 呢？ 如果度为2那么进入上面那段逻辑，将后继节点赋值给了node, 而后继节点必然是读为 1 或者 0 的节点）
    let replacement: Node<E> = node.left != null ? node.left : node.right;

    if (replacement != null) {
      // node 是度为 1 的节点
      // 更改 parent
      replacement.parent = node.parent;
      // 更改 parent 的left ， right 指向
      if (node.parent != null) {
        // node 是度为1的节点，并且是根节点
        this._root = replacement;
      } else if (node == node.parent.left) {
        node.parent.left = replacement;
      } else {
        node.parent.right = replacement;
      }

      // 删除节点之后的处理
      this.afterRemove(node)
    } else if (node.parent == null) {
      // node 是叶子节点并且是根节点
      this._root = null;

      // 删除节点之后的处理
      this.afterRemove(node);
    } else {
      // node 是叶子节点， 但不是更节点
      if (node == node.parent.left) {
        node.parent.left = null;
      } else {
        // node = node.parent.right
        node.parent.right = null;
      }

      // 删除节点之后的处理
      this.afterRemove(node);
    }
  }

  remove(element: E): void {
    this._remove(this.node(element));
  }

  contains(element: E): boolean {
    return this.node(element) != null;
  }

  /**
   * 添加node之后的调整
   * @param node 新添加的节点
   */
  protected afterAdd(node: Node<E>): void {}

  /**
   * 删除node之后的调整
   * @param node 被删除的节点
   */
  protected afterRemove(node: Node<E>): void {}
}