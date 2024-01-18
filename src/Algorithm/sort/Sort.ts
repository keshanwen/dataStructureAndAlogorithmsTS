export interface Comparator<E> {
  compare(e1: E, e2: E): number;
}

export abstract class Sort<E> {
  protected array: E[];
  private cmpCount: number = 0;
  private swapCount: number = 0;
  private time: number = 0;
  private comparator: Comparator<E>;

  constructor(arr: E[], comparator?: Comparator<E>) {
    this.array = arr;
    this.comparator = comparator
    this._sort();
  }

  _sort() {
    let start = Date.now();
    this.sort();
    let end = Date.now();
    this.time = end - start;
  }

  protected abstract sort(): void;

  compare(e1: number, e2: number): number {
    this.cmpCount++
    if (this.comparator) {
      return this.comparator.compare(this.array[e1], this.array[e2]);
    }
    return this.array[e1] - this.array[e2]
  }

  swap(i1: number, i2: number) {
    this.swapCount++
    let tmp: E = this.array[i1]
    this.array[i1] = this.array[i2]
    this.array[i2] = tmp
  }

  toString(): void {
    let str = ''
    str += `耗时： ${this.time} \n`
    str += `比较次数： ${this.cmpCount} \n`
    str += `交换次数： ${this.swapCount} \n`
    console.log(str)
    console.log(this.array)
  }

}