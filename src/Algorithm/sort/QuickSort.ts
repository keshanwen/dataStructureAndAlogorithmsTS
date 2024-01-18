import { Sort, Comparator } from './Sort';

export class QuickSort<E> extends Sort<E> {
  constructor(array: E[], comparator?: Comparator<E>) {
    super(array, comparator);
  }

  protected sort(): void {
    this.__sort(0, this.array.length);
  }

  /**
   * 对 [begin, end) 范围的元素进行快速排序
   * @param begin
   * @param end
   */
  __sort(begin: number, end: number): void {
    if (end - begin < 2) return

    // 确定轴点位置
    let mid: number = this.pivotIndex(begin, end)
    // 对子序列进行快速排序
    this.__sort(begin, mid)
    this.__sort(mid + 1, end)
  }

  /**
   * 构造出 [begin, end) 范围的轴点元素
   * @return 轴点元素的最终位置
   */
  private pivotIndex(begin: number, end: number): number {
    // 随机选择一个元素跟 begin 位置进行交换
    this.swap(begin, begin + Math.floor(Math.random() * (end - begin)))

    // 备份 begin 位置元素
    let pivot: E = this.array[begin]
    // end 指向最后一个元素
    end--

    while (begin < end) {
      while (begin < end) {
        if (this.compare(pivot as number, this.array[end] as number, true) < 0) { // 右边元素 > 轴点元素
          end--
        } else { // 右边元素 <= 轴点元素
          this.array[begin++] = this.array[end]
          break
        }
      }
      while (begin < end) {
        if (this.compare(pivot as number, this.array[begin] as number, true) > 0) { // 左边元素 < 轴点元素
          begin++
        } else { // 左边元素 >= 轴点元素
          this.array[end--] = this.array[begin]
          break
        }
      }
    }

    // 将轴点元素放入最终位置
    this.array[begin] = pivot
    // 返回轴点元素的位置
    return begin
  }
}


export class QuickSort2<E> extends Sort<E> {
  constructor(array: E[], comparator?: Comparator<E>) {
    super(array, comparator);
  }

  protected sort(): void {
    this.__sort(this.array)
  }

  __sort(arr: E[]) {
    if (arr.length <= 1) {
      return arr;
    }
    // 取基准点
    const midIndex: number = Math.floor(arr.length / 2);
    // 取基准点的值
    const midIndexVal: E = arr[midIndex];
    const left: E[] = []; // 存放比基准点小的值
    const right: E[] = []; // 存放比基准点大的值
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < midIndexVal) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    // 递归执行以上操作， 对左右两个数组进行操作， 直到数组长度为1
    return this.__sort(left).concat(midIndexVal,this.__sort(right))
  }
}