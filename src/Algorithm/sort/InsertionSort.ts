import { Sort, Comparator } from './Sort';

/*
  插入排序： 通过构建有序序列， 对于未排序数据， 在已排序序列中从后向前扫描，找到相应位置并插入。

  1.从第一个元素开始，该元素可以认为已经被排序。
  2.取出下一个元素， 在已经排序的元素序列中从后向前扫描。
  3.如果该元素 （已排序）大于新元素，将该元素移动到下一位置。
  4. 重复步骤3， 直到找到已排序的元素小于或者等于新元素。
  5. 将新元素插入到改位置后。
  6. 重复步骤 2 ~ 5

  可以想象成打扑克牌，你从头开始摸牌的过程， 你在摸牌过程中，将牌从左到右排序， 新来一张牌你会从
  最右边的牌比较，如果新牌大，那么将替换他们的位置，一直比较下去，直到已经是正序。
*/

export class InsertionSort<E> extends Sort<E> {
  constructor(array: E[],comparator?: Comparator<E>) {
    super(array,comparator)
  }

  protected sort(): void {
    for (let begin = 1; begin < this.array.length; begin++) {
      let cur: number = begin
      while (cur > 0 && this.compare(cur, cur -1) < 0) {
        this.swap(cur, cur - 1)
        cur--
      }
    }
  }
}


/*
  优化： 并不是每次比较之后都需要替换两个位置元素
*/
export class InsertionSort2<E> extends Sort<E> {
  constructor(array: E[], comparator?: Comparator<E>) {
    super(array, comparator);
  }

  protected sort(): void {
    for (let begin = 1; begin < this.array.length; begin++) {
      let cur: number = begin
      let v: E = this.array[cur]
      while (cur > 0 && this.compare(v as number, this.array[cur - 1] as number, true) < 0) {
        this.array[cur] = this.array[cur - 1] // 此时 cur - 1 的元素是之前的元素，暂时没有替换
        cur-- // 这个时候 cur - 1 那么现在的cur, 就对应了之前的 cur - 1, 如果不满足条件，那么在替换cur,
      }
      this.array[cur] = v
    }
  }
}

export class InsertionSort3<E> extends Sort<E> {
  constructor(array: E[], comparator?: Comparator<E>) {
    super(array, comparator);
  }

/*   protected sort(): void {
    for (let begin = 1; begin < this.array.length; begin++) {
      let v: E = this.array[begin]
      let insertIndex: number = this.search(begin)
      // 将 [insertIndex, begin) 范围内的元素往右边挪动一个单位
      for (let i = begin; i > insertIndex; i--) {
        this.array[i] = this.array[i-1]
      }
      this.array[insertIndex] = v
    }
  } */
  protected sort(): void {
    for (let begin = 1; begin < this.array.length; begin++) {
      this.insert(begin, this.search(begin))
    }
  }

  /**
   * 将source位置的元素插入到dest位置
   * @param source
   * @param dest
   */
  private insert(source: number, dest: number): void {
    let v: E = this.array[source]
    for (let i = source; i > dest; i--) {
      this.array[i] = this.array[i-1]
    }
    this.array[dest] = v
  }

  /**
   * 利用二分搜索找到 index 位置元素的待插入位置
   * 已经排好序数组的区间范围是 [0, index)
   * @param index
   * @return
   */
  private search(index: number): number {
    let begin: number = 0;
    let end: number = index;
    while (begin < end) {
      let mid = (begin + end) >> 1;
      if (this.compare(index, mid) < 0) {
        end = mid;
      } else {
        begin = mid + 1;
      }
    }
    return begin;
  }
}
