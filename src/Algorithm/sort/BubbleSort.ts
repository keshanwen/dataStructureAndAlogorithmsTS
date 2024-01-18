import { Sort ,Comparator} from './Sort'

export class BubbleSort<E> extends Sort<E> {
  constructor(array: E[], comparator?: Comparator<E>) {
    super(array, comparator)
  }

  protected sort(): void {
    for (let end = this.array.length - 1; end > 0; end--) {
      for (let begin = 1; begin <= end; begin++) {
        if (this.compare(begin,  begin - 1)  < 0) {
          this.swap(begin, begin - 1);
        }
      }
    }
  }
}

/* 优化当某次冒泡操作已经没有数据交换时，说明已经达到完全有序， 不用在继续执行后续的冒泡操作 */
export class BubbleSort2<E> extends Sort<E> {
  constructor(array: E[], comparator?: Comparator<E>) {
    super(array, comparator);
  }
  protected sort(): void {
    for (let end = this.array.length - 1; end > 0; end--) {
      let sorted: Boolean = true
      for (let begin = 1; begin <= end; begin++) {
        if (this.compare(begin, begin - 1) < 0) {
          this.swap(begin, begin - 1)
          sorted = false
        }
      }
      if (sorted) break
    }
  }
}

/* 记住最后一次交换的位置，那么最后一次交换的位置之后都是有序的， 下回比较的时候不用去比较之后的位置 */
export class BubbleSort3<E> extends Sort<E> {
  constructor(array: E[], comparator?: Comparator<E>) {
    super(array, comparator);
  }

  protected sort(): void {
    for (let end = this.array.length - 1; end > 0; end--) {
      let sortedIndex = 1;
      for (let begin = 1; begin <= end; begin++) {
        if (this.compare(begin, begin - 1) < 0) {
          this.swap(begin, begin - 1);
          sortedIndex = begin
        }
      }
      end = sortedIndex
    }
  }
}