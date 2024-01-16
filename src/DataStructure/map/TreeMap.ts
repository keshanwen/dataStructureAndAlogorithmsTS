import { Visitor, Map } from './Map';
import { Queue } from '../queue/index'

enum Color {
  RED = 'RED',
  BLACK = 'BLACK',
}

export interface Comparator<E> {
  compare(e1: E, e2: E): number;
}

export class Node<K, V> {
  key: K
  value: V
  color: Color = Color.RED
  left: Node<K, V>
  right: Node<K, V>
  parent: Node<K, V>

  constructor(key: K, value: V, parent: Node<K,V>) {
    this.key = key
    this.value = value
    this.parent = parent
  }

  isLeaf(): boolean {
    return !this.left && !this.right
  }

  hasTwoChildren(): boolean {
    return !!this.left && !!this.right;
  }

  isLeftChild(): boolean {
    return !!this.parent && this == this.parent.left
  }

  isRightChild(): boolean {
    return !!this.parent && this == this.parent.right
  }

  sibling(): Node<K, V> {
    if (this.isLeftChild()) {
      return this.parent.right
    }
    if (this.isRightChild()) {
      return this.parent.left
    }
    return null
  }
}


export class TreeMap<K, V> implements Map<K, V> {
  private _size: number = 0;
  private _root: Node<K, V>;
  private comparator: Comparator<K>;

  constructor(comparator?: Comparator<K>) {
    this.comparator = comparator;
  }

  size(): number {
    return this._size;
  }
  isEmpty(): boolean {
    return this._size == 0;
  }
  clear(): void {
    this._root = null;
    this._size = 0;
  }
  put(key: K, value: V): V {
    this.keyNotNullCheck(key);

    // 添加第一个节点
    if (!this._root) {
      this._root = new Node<K, V>(key, value, null);
      this._size++;

      // 新添加节点之后的处理
      this.afterPut(this._root);
      return null;
    }

    // 添加的不是第一个节点
    // 找到父节点
    let parent: Node<K, V> = this._root;
    let node: Node<K, V> = this._root;
    let cmp: number = 0;

    do {
      cmp = this.compare(key, node.key);
      parent = node;
      if (cmp > 0) {
        node = node.right;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        node.key = key;
        let oldVlaue: V = node.value;
        node.value = value;
        return oldVlaue;
      }
    } while (node);

    // 看看插入到父节点的那个位置
    let newNode: Node<K, V> = new Node<K, V>(key, value, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }

    this._size++;

    // 新添加节点之后的处理
    this.afterPut(newNode);
    return null;
  }
  get(key: K): V {
    let node: Node<K, V> = this.node(key);
    return node ? node.value : null;
  }
  remove(key: K): V {
    return this._remove(this.node(key));
  }
  containsKey(key: K): boolean {
    return !!this.node(key);
  }
  containsValue(value: V): boolean {
    if (!this._root) return false;

    let queue: Queue<Node<K, V>> = new Queue<Node<K, V>>();
    queue.enQueue(this._root);

    while (!queue.isEmpty()) {
      let node: Node<K, V> = queue.deQueue();

      if (this.valEquals(value, node.value)) return true;

      if (node.left) queue.enQueue(node.left);

      if (node.right) queue.enQueue(node.right);
    }

    return false;
  }
  traversal(visitor: Visitor<K, V>): void {
    if (!visitor) return;
    this._traversal(this._root, visitor);
  }

  private _traversal(node: Node<K, V>, visitor: Visitor<K, V>): void {
    if (!node || visitor.stop) return;

    this._traversal(node.left, visitor);
    if (visitor.stop) return;
    visitor.stop = visitor.visit(node.key, node.value);
    this._traversal(node.right, visitor);
  }

  private valEquals(v1: V, v2: V): boolean {
    // 简单的比较
    return v1 == null ? v2 == null : v1 === v2;
  }

  private _remove(node: Node<K, V>): V {
    if (!node) return null;

    this._size--;

    let oldValue: V = node.value;

    if (node.hasTwoChildren()) {
      // 度为2的节点
      // 找到后继节点
      let s: Node<K, V> = this.successor(node);
      // 用后继节点的值覆盖度为2的节点的值
      node.key = s.key;
      node.value = s.value;
      // 删除后继节点
      node = s;
    }

    // 删除node节点（node的度必然是1或者0）
    let replacement: Node<K, V> = node.left ? node.left : node.right;

    if (replacement) {
      // node是度为1的节点
      // 更改parent
      replacement.parent = node.parent;
      // 更改parent的left、right的指向
      if (!node.parent) {
        // node是度为1的节点并且是根节点
        this._root = replacement;
      } else if (node == node.parent.left) {
        node.parent.left = replacement;
      } else {
        // node == node.parent.right
        node.parent.right = replacement;
      }

      // 删除节点之后的处理
      this.afterRemove(replacement);
    } else if (!node.parent) {
      // node是叶子节点并且是根节点
      this._root = null;
    } else {
      // node是叶子节点，但不是根节点
      if (node == node.parent.left) {
        node.parent.left = null;
      } else {
        // node == node.parent.right
        node.parent.right = null;
      }

      // 删除节点之后的处理
      this.afterRemove(node);
    }

    return oldValue;
  }

  private afterRemove(node: Node<K, V>): void {
    // 如果删除的节点是红色
    // 或者 用以取代删除节点的子节点是红色
    if (this.isRed(node)) {
      this.black(node);
      return;
    }

    let parent: Node<K, V> = node.parent;
    if (!parent) return;

    // 删除的是黑色叶子节点【下溢】
    // 判断被删除的node是左还是右
    let left: boolean = !parent.left || node.isLeftChild();
    let sibling: Node<K, V> = left ? parent.right : parent.left;
    if (left) {
      // 被删除的节点在左边，兄弟节点在右边
      if (this.isRed(sibling)) {
        // 兄弟节点是红色
        this.black(sibling);
        this.red(parent);
        this.rotateLeft(parent);
        // 更换兄弟
        sibling = parent.right;
      }

      // 兄弟节点必然是黑色
      if (this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
        // 兄弟节点没有1个红色子节点，父节点要向下跟兄弟节点合并
        let parentBlack: boolean = this.isBlack(parent);
        this.black(parent);
        this.red(sibling);
        if (parentBlack) {
          this.afterRemove(parent);
        }
      } else {
        // 兄弟节点至少有1个红色子节点，向兄弟节点借元素
        // 兄弟节点的左边是黑色，兄弟要先旋转
        if (this.isBlack(sibling.right)) {
          this.rotateRight(sibling);
          sibling = parent.right;
        }

        this.color(sibling, this.colorOf(parent));
        this.black(sibling.right);
        this.black(parent);
        this.rotateLeft(parent);
      }
    } else {
      // 被删除的节点在右边，兄弟节点在左边
      if (this.isRed(sibling)) {
        // 兄弟节点是红色
        this.black(sibling);
        this.red(parent);
        this.rotateRight(parent);
        // 更换兄弟
        sibling = parent.left;
      }

      // 兄弟节点必然是黑色
      if (this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
        // 兄弟节点没有1个红色子节点，父节点要向下跟兄弟节点合并
        let parentBlack: boolean = this.isBlack(parent);
        this.black(parent);
        this.red(sibling);
        if (parentBlack) {
          this.afterRemove(parent);
        }
      } else {
        // 兄弟节点至少有1个红色子节点，向兄弟节点借元素
        // 兄弟节点的左边是黑色，兄弟要先旋转
        if (this.isBlack(sibling.left)) {
          this.rotateLeft(sibling);
          sibling = parent.left;
        }

        this.color(sibling, this.colorOf(parent));
        this.black(sibling.left);
        this.black(parent);
        this.rotateRight(parent);
      }
    }
  }

  private predecessor(node: Node<K, V>): Node<K, V> {
    if (!node) return null;

    // 前驱节点在左子树当中 （left.right.right.....）
    let p: Node<K, V> = node.left;
    if (p) {
      while (p.right) {
        p = p.right;
      }
      return p;
    }

    // 从父节点， 祖父节点中寻找前驱节点
    while (node.parent && node === node.parent.left) {
      node = node.parent;
    }

    // node.parent == null
    // node == node.parent.right
    return node.parent;
  }

  private successor(node: Node<K, V>): Node<K, V> {
    if (!node) return null;

    let p: Node<K, V> = node.right;
    if (p) {
      while (p.left) {
        p = p.left;
      }
      return p;
    }

    while (node.parent != null && node == node.parent.right) {
      node = node.parent;
    }

    return node.parent;
  }

  private node(key: K): Node<K, V> {
    let node: Node<K, V> = this._root;
    while (node) {
      let cmp: number = this.compare(key, node.key);
      if (cmp == 0) return node;
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return null;
  }

  private afterPut(node: Node<K, V>): void {
    let parent: Node<K, V> = node.parent;

    // 添加的是根节点 或者 上溢到达了根节点
    if (!parent) {
      this.black(node);
      return;
    }

    // 如果父节点是黑色，直接返回
    if (this.isBlack(parent)) return;

    // 叔父节点
    let uncle: Node<K, V> = parent.sibling();
    // 祖父节点
    let grand: Node<K, V> = this.red(parent.parent);
    if (this.isRed(uncle)) {
      // 叔父节点是红色【B树节点上溢】
      this.black(parent);
      this.black(uncle);
      // 把祖父节点当做是新添加的节点
      this.afterPut(grand);
      return;
    }

    // 叔父节点不是红色
    if (parent.isLeftChild()) {
      // L
      if (node.isLeftChild()) {
        // LL
        this.black(parent);
      } else {
        // LR
        this.black(node);
        this.rotateLeft(parent);
      }
      this.rotateRight(grand);
    } else {
      // R
      if (node.isLeftChild()) {
        // RL
        this.black(node);
        this.rotateRight(parent);
      } else {
        // RR
        this.black(parent);
      }
      this.rotateLeft(grand);
    }
  }

  private rotateLeft(grand: Node<K, V>): void {
    let parent: Node<K, V> = grand.right;
    let child: Node<K, V> = parent.left;
    grand.right = child;
    parent.left = grand;
    this.afterRotate(grand, parent, child);
  }

  private rotateRight(grand: Node<K, V>): void {
    let parent: Node<K, V> = grand.left;
    let child: Node<K, V> = parent.right;
    grand.left = child;
    parent.right = grand;
    this.afterRotate(grand, parent, child);
  }

  private afterRotate(
    grand: Node<K, V>,
    parent: Node<K, V>,
    child: Node<K, V>
  ): void {
    // 让parent称为子树的根节点
    parent.parent = grand.parent;
    if (grand.isLeftChild()) {
      grand.parent.left = parent;
    } else if (grand.isRightChild()) {
      grand.parent.right = parent;
    } else {
      // grand是root节点
      this._root = parent;
    }

    // 更新child的parent
    if (child) {
      child.parent = grand;
    }

    // 更新grand的parent
    grand.parent = parent;
  }

  private color(node: Node<K, V>, color: Color): Node<K, V> {
    if (!node) return node;
    node.color = color;
    return node;
  }

  private red(node: Node<K, V>): Node<K, V> {
    return this.color(node, Color.RED);
  }

  private black(node: Node<K, V>): Node<K, V> {
    return this.color(node, Color.BLACK);
  }

  private colorOf(node: Node<K, V>): Color {
    return node ? node.color : Color.BLACK;
  }

  private isBlack(node: Node<K, V>): boolean {
    return this.colorOf(node) === Color.BLACK;
  }

  private isRed(node: Node<K, V>) {
    return this.colorOf(node) === Color.RED;
  }

  private compare(e1: K, e2: K): number {
    if (this.comparator) {
      return this.comparator.compare(e1, e2);
    }
    return (e1 as number) - (e2 as number);
  }
  private keyNotNullCheck(key: K): void {
    if (key == null || key == undefined) {
      throw new Error('key must no be null');
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~, 方便调试
  height(): number {
    if (!this._root) return 0;

    let height = 0;
    let levelSize = 1;
    let queue: Queue<Node<K,V>> = new Queue<Node<K,V>>();
    queue.enQueue(this._root);

    while (!queue.isEmpty()) {
      let node: Node<K,V> = queue.deQueue();
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
    let queue: Queue<Node<K,V>> = new Queue<Node<K,V>>();
    queue.enQueue(this._root);
    while (!queue.isEmpty()) {
      let node: Node<K,V> = queue.deQueue();
      levelSize--;
      let curLen = len / Math.pow(2, level - 1) + 1;
      str +=
        '  '.repeat(curLen) +
        `${node.key}: ${node.value} -${node.color === Color.RED ? '红' : '黑'}-[${
          node.parent ? (node.parent.left == node ? 'L' : 'R') : ''
        } ${node.parent ? node.parent.key : null}]`;

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
