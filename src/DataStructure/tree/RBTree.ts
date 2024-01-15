import { Comparator } from './BST';
import { Node } from './BinaryTree';
import { BBST } from './BBST';
import { Queue } from '../queue/index';

enum Color {
  RED = 'RED',
  BLACK = 'BLACK',
}


/* 红黑树的理解可以结合 4阶B 树 */
export class RBNode<E> extends Node<E> {
  color: Color = Color.RED; // 默认红色节点， 方便计算

  constructor(element: E, parent: Node<E>) {
    super(element, parent)
  }

  toString(): string {
    let str: string = ''
    if (this.color == Color.RED) {
      str = "R_"
    }
    return str + this.element.toString()
  }
}

export class RBTree<E> extends BBST<E> {
  constructor(comparator?: Comparator<E>) {
    super(comparator);
  }

  protected afterAdd(node: Node<E>): void {
    let parent: Node<E> = node.parent

    // 添加的是根节点 或者 上溢到达了根节点
    if (!parent) {
      this.black(node)
    }

    // 如果父节点是黑色，直接返回
    if (this.isBlack(parent)) return

    // 叔父节点
    let uncle: Node<E> = parent.sibling()
    // 祖父节点
    let grand: Node<E> = this.red(parent.parent)

    if (this.isRed(uncle)) { // 叔父节点是红色（B 树节点上溢）
      this.black(parent)
      this.black(uncle)
      // 把祖父节点当作是新添加的节点
      this.afterAdd(grand)
      return
    }

    // 叔父节点不是红色
    if (parent.isLeftChild()) { // L
      if (node.isLeftChild()) { // LL
        this.black(parent)
      } else { // LR
        this.black(node)
        this.rotateLeft(parent)
      }
      this.rotateRight(grand)
    } else { // R
      if (node.isLeftChild()) { // RL
        this.black(node)
        this.rotateRight(parent)
      } else { // RR
        this.black(parent)
      }
      this.rotateLeft(grand)
    }
  }

  protected afterRemove(node: Node<E>): void {
    console.log('afterRemove~~~~~', node);
    // 如果删除的节点是红色的，或者用以取代删除节点的子节点是红色
    if (this.isRed(node)) {
      this.black(node)
      return
    }

    let parent: Node<E> = node.parent
    // 删除的是根节点
    if (!parent) return

    // 删除的是黑色叶子节点（下溢）
    // 判断被删除的 node 是左还是右
    let left: boolean = !parent.left || node.isLeftChild()
    let sibling: Node<E> = left ? parent.right : parent.left
    if (left) { // 被删除的节点在左边， 兄弟节点在右边
      if (this.isRed(sibling)) { // 兄弟节点是红色
        this.black(sibling)
        this.red(parent)
        this.rotateLeft(parent)
        // 更换兄弟
        sibling = parent.right
      }

      // 兄弟节点必然是黑色的
      if (this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
        // 兄弟节点没有1个红色子节点，父节点要向下跟兄弟节点合并
        let parentBlack: boolean = this.isBlack(parent)
        this.black(parent)
        this.red(sibling)
        if (parentBlack) {
          this.afterRemove(parent)
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
    } else { // 被删除的节点在右边，兄弟节点在左边
      if (this.isRed(sibling)) { // 兄弟节点是红色
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
			} else { // 兄弟节点至少有1个红色子节点，向兄弟节点借元素
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

  private color(node: Node<E>, color: Color): Node<E> {
    if (!node) return node;
    (node as RBNode<E>).color = color;
    return node;
  }

  private red(node: Node<E>): Node<E> {
    return this.color(node, Color.RED);
  }

  private black(node: Node<E>): Node<E> {
    return this.color(node, Color.BLACK);
  }

  private colorOf(node: Node<E>): Color {
    return node ? (node as RBNode<E>).color : Color.BLACK;
  }

  isBlack(node: Node<E>): boolean {
    return this.colorOf(node) === Color.BLACK;
  }

  isRed(node: Node<E>): boolean {
    return this.colorOf(node) === Color.RED;
  }

  protected createNode(element: E, parent: Node<E>): Node<E> {
    return new RBNode<E>(element, parent);
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
        `${node.element}-${node.color === Color.RED ? '红' : '黑'}-[${
          node.parent ? (node.parent.left == node ? 'L' : 'R') : ''
        } ${node.parent ? node.parent.element : null}]`;

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
