
export class BinarySearch {
  // 查找 v 在有序数组 array 中的位置
  indexOf(array: number[], v: number): number {
    if (!array || array.length === 0) return -1
    let begin: number = 0
    let end: number = array.length
    while (begin < end) {
      let mid: number = (begin + end) >> 1
      if (v < array[mid]) {
        end = mid
      } else if (v > array[mid]) {
        begin = mid + 1
      } else {
        return mid
      }
    }
    return -1
  }

  // 查找v在有序数组 array 中待插入的位置
  search(array:  number[],v: number): number {
    if (!array || array.length === 0) return -1;
    let begin: number = 0
    let end: number = array.length
    while (begin < end) {
      let mid = (begin + end) >> 1
      if (v < array[mid]) {
        end = mid
      } else {
        begin = mid + 1
      }
    }
    return begin
  }
}