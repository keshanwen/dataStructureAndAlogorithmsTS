import AbstractList from './AbstractList';

export class ArrayList<E> extends AbstractList<E> {
  private elements: E[];
  private DEFAULT_CAPACITY: number = 10;

  constructor(capaticy: number = 10) {
    super();
    capaticy =
      capaticy < this.DEFAULT_CAPACITY ? this.DEFAULT_CAPACITY : capaticy;
    this.elements = new Array(capaticy);
  }

  /**
   * 清除所有元素
   */
  clear(): void {
    for (let i = 0; i < this._size; i++) {
      this.elements[i] = null;
    }
    this._size = 0;

    // 缩容
    if (this.elements !== null && this.elements.length > this.DEFAULT_CAPACITY) {
      this.elements = new Array(this.DEFAULT_CAPACITY);
    }
  }

  /**
   * 获取index位置的元素
   * @param index
   * @return
   */
  get(index: number): E {
    this.rangeCheck(index);

    return this.elements[index];
  }

  /**
   * 设置index位置的元素
   * @param index
   * @param element
   * @return 原来的元素ֵ
   */
  set(index: number, element: E): E {
    this.rangeCheck(index);

    let old = this.elements[index];
    this.elements[index] = element;
    return old;
  }

  /**
   * 在index位置插入一个元素
   * @param index
   * @param element
   */
  add(element: E): void;
  add(index: number, element: E): void;
  add(index: unknown, element?: unknown): void {
    if (!element) {
      element = index;
      index = this._size;
    }

    this.rangeCheckForAdd(index as number);

    this.ensureCapacity(this._size + 1);

    for (let i = this._size; i > <number>index; i--) {
      this.elements[i] = this.elements[i - 1];
    }
    this.elements[index] = element;
    this._size++;
  }

  /**
   * 删除index位置的元素
   * @param index
   * @return
   */
  remove(index: number): E {
    this.rangeCheck(index);

    let old = this.elements[index];
    for (let i = index + 1; i < this._size; i++) {
      this.elements[i - 1] = this.elements[i];
    }
    this.elements[--this._size] = null;

    this.trim()
    return old;
  }

  /**
   * 查看元素的索引
   * @param element
   * @return
   */
  indexOf(element: E): number {
    if (element === null) {
      for (let i = 0; i < this._size; i++) {
        if (this.elements[i] === null) return i
      }
    } else {
      for (let i = 0; i < this._size; i++) {
        // 待优化 element.equals(elements[i])
        if (this.elements[i] === element) return i;
      }
    }
    return this.ELEMENT_NOT_FOUND
  }

  /**
   * 保证要有capacity的容量
   * @param capacity
   */
  private ensureCapacity(capacity: number): void {
    let oldCapacity = this.elements.length;
    if (oldCapacity >= capacity) return;

    // 新容量为旧容量的 1.5 倍
    let newCapacity = oldCapacity + (oldCapacity >> 1);
    let newElements: E[] = new Array(newCapacity);
    for (let i = 0; i < this._size; i++) {
      newElements[i] = this.elements[i];
    }
    this.elements = newElements;

    console.log(oldCapacity + '扩容为' + newCapacity);
  }

  private trim() {
    let oldCapacity = this.elements.length
    let newCapacity = oldCapacity >> 1
    if (this._size > (newCapacity) || oldCapacity <= this.DEFAULT_CAPACITY) return

    // 剩余空间还有很多
    let newElements: E[] = new Array(newCapacity)
    for (let i = 0; i < this._size;i++) {
      newElements[i] = this.elements[i]
    }

    this.elements = newElements
    console.log(oldCapacity + '缩容为' + newCapacity)
  }

  toString() {
    console.log(this.elements)
  }
}