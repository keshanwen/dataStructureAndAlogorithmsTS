import { Comparator, BST } from './BST';
import { Node } from './BinaryTree';
import { BBST } from './BBST'


class AVLNode<E> extends Node<E> {
  height: number = 1;

  constructor(element: E, parent: Node<E>) {
    super(element, parent);
  }

  balanceFactor(): number {
    let leftHeight: number = this.left ? (<AVLNode<E>>this.left).height : 0
    let rightHeight: number = this.right ? (<AVLNode<E>>this.right).height : 0
    return leftHeight - rightHeight
  }

  updateHeight():void {
    let leftHeight: number = this.left ? (<AVLNode<E>>this.left).height : 0;
    let rightHeight: number = this.right ? (<AVLNode<E>>this.right).height : 0;
    this.height = 1 + Math.max(leftHeight, rightHeight)
  }

  tallerChild(): Node<E> {
    let leftHeight: number = this.left ? (<AVLNode<E>>this.left).height : 0;
    let rightHeight: number = this.right ? (<AVLNode<E>>this.right).height : 0;
    if (leftHeight > rightHeight) return this.left
    if (leftHeight < rightHeight) return this.right
    return this.isLeftChild() ? this.left : this.right;
  }
}

export class AVLTree<E> extends BBST<E> {
  constructor(comparator?: Comparator<E>) {
    super(comparator);
  }

  protected afterAdd(node: Node<E>): void {
    node = node.parent;
    while (node) {
      if (this.isBalanced(node)) {
        // 更新高度
        this.updateHeight(node);
      } else {
        // 恢复平衡
        this.rebalance(node);
        break;
      }
      node = node.parent;
    }
  }

  protected afterRemove(node: Node<E>): void {
    node = node.parent;
    while (node) {
      if (this.isBalanced(node)) {
        // 更新高度
        this.updateHeight(node);
      } else {
        // 恢复平衡
        this.rebalance(node);
      }
      node = node.parent;
    }
  }

  protected createNode(element: E, parent: Node<E>): Node<E> {
    return new AVLNode<E>(element, parent);
  }

  /**
   * 恢复平衡
   * @param grand 高度最低的那个不平衡节点
   */
  private rebalance(grand: Node<E>): void {
    let parent: Node<E> = (grand as AVLNode<E>).tallerChild();
    let node: Node<E> = (parent as AVLNode<E>).tallerChild();

    if (parent.isLeftChild()) {
      // L
      if (node.isLeftChild()) {
        // LL
        this.rotateRight(grand);
      } else {
        // LR
        this.rotateLeft(parent);
        this.rotateRight(grand);
      }
    } else {
      // R
      if (node.isLeftChild()) {
        // RL
        this.rotateRight(parent);
        this.rotateLeft(grand);
      } else {
        // RR
        this.rotateLeft(grand);
      }
    }
  }
  /**
   * 恢复平衡
   * @param grand 高度最低的那个不平衡节点
   */
  private rebalance2(grand: Node<E>): void {
    let parent: Node<E> = (grand as AVLNode<E>).tallerChild();
    let node: Node<E> = (parent as AVLNode<E>).tallerChild();
    if (parent.isLeftChild()) {
      // L
      if (node.isLeftChild()) {
        // LL
        this.rotate(grand, node, node.right, parent, parent.right, grand);
      } else {
        // LR
        this.rotate(grand, parent, node.left, node, node.right, grand);
      }
    } else {
      // R
      if (node.isLeftChild()) {
        // RL
        this.rotate(grand, grand, node.left, node, node.right, parent);
      } else {
        // RR
        this.rotate(grand, grand, parent.left, parent, node.left, node);
      }
    }
  }

  protected rotate(
    r: Node<E>, // 字树根节点
    b: Node<E>,
    c: Node<E>,
    d: Node<E>,
    e: Node<E>,
    f: Node<E>
  ): void {
    super.rotate(r,b,c,d,e,f)

    // 更新高度
    this.updateHeight(b);
    this.updateHeight(f);
    this.updateHeight(d);
  }

  protected afterRotate(grand: Node<E>, parent: Node<E>, child: Node<E>): void {
    super.afterRotate(grand, parent, child)

    // 更新高度
    this.updateHeight(grand);
    this.updateHeight(parent);
  }

  private isBalanced(node: Node<E>): boolean {
    return Math.abs((node as AVLNode<E>).balanceFactor()) <= 1;
  }

  private updateHeight(node: Node<E>): void {
    (<AVLNode<E>>node).updateHeight();
  }
}