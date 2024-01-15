export interface Visitor<E> {
  stop?: Boolean;

  /**
   * @return 如果返回true，就代表停止遍历
   */
  visit(element: E): boolean;
}

export interface Set<E> {
  size(): number;

  isEmpty(): boolean;

  clear(): void;

  add(element: E): void;

  remove(element: E): void;

  traversal(visitor: Visitor<E>):void
}
