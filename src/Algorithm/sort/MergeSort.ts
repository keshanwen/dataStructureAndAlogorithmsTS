import { Sort, Comparator } from './Sort';
/*
  排序一个数组， 我们先把数组从中间分成前后两部分， 然后对前后两部分分别排序，再将排好序的两部分合并
  在一起， 这样整个数组就都有序了。
  归并排序采用的是分治思想
  分治，就是分治而之，将一个大问题分解成小的问题来解决。小的问题解决了，大的问题也就解决了.
*/

export class MergeSort<E> extends Sort<E> {
  leftArray: E[]

  constructor(array: E[], comparator?: Comparator<E>) {
    super(array, comparator);
  }

  protected sort(): void {
    this.leftArray = new Array(this.array.length >> 1);
    this.__sort(0, this.array.length)
  }

  /*
    对 [begin, end) 范围的数据进行归并排序
  */
  private __sort(begin: number, end: number): void {
    if (end - begin < 2) return

    let mid: number = (begin + end) >> 1
    this.__sort(begin, mid)
    this.__sort(mid, end)
    this.merge(begin, mid, end)
  }

  /*
    将 [begin,mid) 和 [mid, end) 范围的序列合并成一个有序序列.
    [begin, mid) [mid, end) 已经是有序的
  */
  private merge(begin: number, mid: number, end: number): void {
    let li = 0, le = mid - begin; // li = begin, len = mid   ===>> li = begin -begin  len = mid - begin
    let ri = mid, re = end;
    let ai = begin;

    // 备份左边数组
    for (let i = li; i < le; i++) {
      this.leftArray[i] = this.array[begin + i] // 取array 的值时为什么要加 begin 呢?
    }

    // 如果左边还没有结束
    while (li < le) {
      if (ri < re && this.compare(this.array[ri] as number, this.leftArray[li] as number, true) < 0) {
        this.array[ai++] = this.array[ri++]
      } else {
        this.array[ai++] = this.leftArray[li++]
      }
    }
  }
}

export class MergeSort2<E> {
  sort(arr: E[]) {
     const len: number = arr.length;
     if (len < 2) {
       return arr;
     }

     let middle: number = len >> 1,
       left: E[] = arr.slice(0, middle),
       right: E[] = arr.slice(middle);

     return this.merge(this.sort(left), this.sort(right));
  }

  private merge(left: E[], right: E[]) {
    let result: E[] = [];

    while (left.length && right.length) {
      // 注意： 判断条件是小于或等于， 如果只是小于，那么排序将不稳定
      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    if (left.length) result = result.concat(left);
    if (right.length) result = result.concat(right);

    return result;
  }
}
