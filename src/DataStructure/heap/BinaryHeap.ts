import { AbstractHeap } from './AbstractHeap'
import { BinaryTreeInfo } from '../tree/BinaryTreeInfo'
import { Comparator } from './AbstractHeap'


export class BinaryHeap<E> extends AbstractHeap<E> implements BinaryTreeInfo {
  private elements: E[];
  private DEFAULT_CAPACITY: number = 10;

  constructor(elements?: E[], comparator?: Comparator<E>) {
    super(comparator);

    if (arguments.length === 2 || (arguments.length === 1 && Array.isArray(elements))) {
      this._size = elements.length
      let capacity = Math.max(this._size, this.DEFAULT_CAPACITY)
      this.elements = new Array<E>(capacity)
      for (let i = 0; i < this._size;i++) {
        this.elements[i] = elements[i]
      }
      this.heapify()
    } else {
      this.elements = new Array<E>(this.DEFAULT_CAPACITY)
    }

  }

  clear(): void {
    for (let i = 0; i < this._size;i++) {
      this.elements[i] = null
    }
    this._size = 0
  }

  add(element: E): void {
    this.elementNotNullCheck(element)
    this.ensureCapacity(this._size + 1)
    this.elements[this._size++] = element
    this.siftUp(this._size -1)
  }

  get(): E {
    this.emptyCheck()
    return this.elements[0]
  }

  remove(): E {
    this.emptyCheck()

    let lastIndex: number = --this._size
    let root: E = this.elements[0]
    this.elements[0] = this.elements[lastIndex]
    this.elements[lastIndex] = null

    this.siftDown(0)
    return root
  }

  replace(element: E): E {
    this.elementNotNullCheck(element)

    let root: E = null
    if (this._size == 0) {
      this.elements[0] = element
      this._size++
    } else {
      root = this.elements[0]
      this.elements[0] = element
      this.siftDown(0)
    }
    return root
  }

  /**
   * 批量建堆
   */
  private heapify(): void {
    // 自上而下的上滤
   /*  for (let i = 1; i < this._size;i++) {
      this.siftUp(i)
    } */

    // 自下而上的下滤
    for (let i = (this._size >> 1) - 1; i >= 0; i--) {
      this.siftDown(i)
    }
  }

  /**
   * 让index位置的元素下滤
   * @param index
   */
  private siftDown(index: number): void {
    let element: E = this.elements[index]
    let half = this._size >> 1
    while (index < half) {
      // index 的节点只有两种情况
      // 1, 只有左子节点
      // 2, 同时有左右子节点

      // 默认为左子节点跟它进行比较
      let childIndex:number = (index << 1) + 1
      let child: E = this.elements[childIndex]

      // 右子节点
      let rightIndex: number = childIndex + 1

      // 选出左右子节点最大的那个
      if (rightIndex < this._size && this.compare(this.elements[rightIndex], child) > 0) {
        child = this.elements[childIndex = rightIndex]
      }

      if (this.compare(element, child) >= 0) break

      // 将子节点存放到 index 位置
      this.elements[index] = child
      // 重新设置 index
      index = childIndex
    }
    this.elements[index] = element
  }

  /**
   * 让index位置的元素上滤
   * @param index
   */
  private siftUp(index: number): void {
    let element: E = this.elements[index]
    while (index > 0) {
      let parentIndex: number = (index - 1) >> 1
      let parent: E = this.elements[parentIndex]
      if (this.compare(element, parent) <= 0) break

      // 将父元素存储在 index 位置
      this.elements[index] = parent

      // 重新赋值 index
      index = parentIndex
    }
    this.elements[index] = element
  }

  private ensureCapacity(capacity: number): void {
    let oldCapacity = this.elements.length
    if (oldCapacity >= capacity) return

    let newCapacity: number = oldCapacity + (oldCapacity >> 1)
    let newElements: E[] = new Array<E>(newCapacity)
    for (let i = 0; i < this._size;i++) {
      newElements[i] = this.elements[i]
    }
    this.elements = newElements
  }

  private emptyCheck(): void {
    if (this._size == 0) {
      throw new Error("Heap is empty")
    }
  }

  private elementNotNullCheck(element: E): void {
    if (!element) {
      throw new Error('elemnet must no be null')
    }
  }

  root(): Object {
    return 0
  }

  left(node: Object): Object {
    let index: number = ((<number>node) << 1) + 1;
		return index >= this._size ? null : index;
  }

  right(node: Object): Object {
    let index: number = ((<number>node) << 1) + 2
    return index >= this._size ? null : index
  }

  string(node: Object): Object {
    return this.elements[node as number];
  }
}