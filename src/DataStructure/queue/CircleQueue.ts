export class CircleQueue<E> {
  private front: number = 0;
  private _size: number = 0;
  private elements: E[];
  private DEFAULT_CAPACITY = 10;

  constructor() {
    this.elements = new Array<E>(this.DEFAULT_CAPACITY);
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  clear(): void {
    for (let i = 0; i < this._size; i++) {
      this.elements[this.index[i]] = null;
    }
    this.front = 0;
    this._size = 0;
  }

  enQueue(element: E):void {
    this.ensureCapacity(this._size + 1)

    this.elements[this.index(this._size)] = element
    this._size++
  }

  deQueue():E {
    let frontElement: E = this.elements[this.front]
    this.elements[this.front] = null
    this.front = this.index(1)
    this._size--
    return frontElement
  }

  getFront(): E {
    return this.elements[this.front]
  }

  private index(index: number): number {
    index += this.front;
    const newIndex = index - (index >= this.elements.length ? this.elements.length : 0)
    return newIndex;
  }

  /**
   * 保证要有capacity的容量
   * @param capacity
   */
  private ensureCapacity(capacity:number):void {
    let oldCapacity = this.elements.length
    if (oldCapacity >= capacity) return;

    // 新容量为旧容量的 1.5 倍
    let newCapacity = oldCapacity + (oldCapacity >> 1)
    let newElements: E[] = new Array<E>(newCapacity)
    for (let i = 0; i < this._size; i++) {
      const newIndex = this.index(i)
      newElements[i] = this.elements[newIndex];
    }
    this.elements = newElements

    // 重置 front
    this.front = 0
  }

  toString(): void {
    console.log(`front: ${this.front} \n`)
    console.log(`_size: ${this._size} \n`)
    console.log(this.elements)
  }
}