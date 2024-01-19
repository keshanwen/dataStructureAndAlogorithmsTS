import { Sort, Comparator } from './Sort';


export class HeapSort<E> extends Sort<E> {
 private heapSize: number

  constructor(array: E[], comparator?: Comparator<E>) {
    super(array, comparator);
  }

  protected sort(): void {
    // 原地建堆
    this.heapSize = this.array.length
    for (let i = (this.heapSize >> 1) - 1; i >= 0; i--) {
      this.siftDown(i)
    }

    while (this.heapSize > 1) {
      // 交换堆顶元素和尾部元素
      this.swap(0, --this.heapSize)

      // 对0位置进行siftDown (恢复堆的性质)
      this.siftDown(0)
    }
  }

  private siftDown(index: number): void {
    let element: E = this.array[index]

    let half: number = this.heapSize >> 1
    while (index < half) { // index 必须是非叶子节点
      // 默认是左边跟父节点比
      let childIndex: number = (index << 1) + 1
      let child: E = this.array[childIndex]
      let rightIndex = childIndex + 1
      // 右子节点比左子节点大
      if (rightIndex < this.heapSize && this.compare(this.array[rightIndex] as number, child as number, true) > 0) {
        child = this.array[childIndex = rightIndex]
      }

      // 大于等于子节点
      if (this.compare(element as number, child as number, true) >= 0) break

      this.array[index] = child
      index = childIndex
    }
    this.array[index] = element
  }
}