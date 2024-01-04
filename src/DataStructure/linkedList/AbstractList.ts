import type { List } from './List';

export default abstract class AbstractList<E> implements List<E> {
  ELEMENT_NOT_FOUND: any =  -1;
  /**
   * 元素的数量
   */
  protected _size: number = 0;

  /**
   * 元素的数量
   * @return
   */
  public size(): number {
    return this._size;
  }
  /**
   * 是否为空
   * @return
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * 是否包含某个元素
   * @param element
   * @return
   */
  contains(element: E): boolean {
    return this.indexOf(element) != this.ELEMENT_NOT_FOUND;
  }

  /**
   * 添加元素到尾部
   *  在index位置插入一个元素
   * @param element
   */
  add(element: E): void;
  add(index: number, element: E): void;
  add(index: unknown, element?: unknown): void {
    //  添加元素到尾部
    if (!element) {
      this.add(this._size, index as E);
    } else {
      this.add(index as number, element as E);
    }
  }

  clear(): void {
    throw new Error('Method not implemented.');
  }

  get(index: number): E {
    throw new Error('Method not implemented.');
  }
  set(index: number, element: E): E {
    throw new Error('Method not implemented.');
  }
  remove(index: number): E {
    throw new Error('Method not implemented.');
  }
  indexOf(element: E): number {
    throw new Error('Method not implemented.');
  }

  protected outOfBounds(index: number): void {
    throw new Error(`Index: ${index}, Size ${this._size}`);
  }

  protected rangeCheck(index: number) {
    if (index < 0 || index >= this._size) {
      this.outOfBounds(index);
    }
  }

  protected rangeCheckForAdd(index: number) {
    if (index < 0 || index > this._size) {
      this.outOfBounds(index);
    }
  }
}
