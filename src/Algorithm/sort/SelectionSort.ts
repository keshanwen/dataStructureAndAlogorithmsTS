import { Sort, Comparator } from './Sort';

/*
  1. 先在排序序列中找到最值的元素，存放到排序序列的起始位置。
  2. 再从剩余未排序元素中继续寻找最值元素，然后放到已排序序列的末尾。
  3. 重复第二步， 只到所有元素都排序完毕。
*/
export class SelectionSort<E> extends Sort<E> {
  constructor(array: E[], comparator?: Comparator<E>) {
    super(array, comparator)
  }

  protected sort(): void {
    for (let end = this.array.length - 1; end > 0; end--) {
      let max = 0
      for (let begin = 1; begin <= end;begin++) {
        if (this.compare(max, begin) < 0) {
          max = begin
        }
      }
      this.swap(max, end)
    }
  }
}