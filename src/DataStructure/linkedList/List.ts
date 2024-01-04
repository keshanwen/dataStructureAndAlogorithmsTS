export interface List<E> {
  ELEMENT_NOT_FOUND: -1;
  /**
   * 清除所有元素
   */
  clear(): void;

  /**
   * 元素的数量
   * @return
   */
  size(): number;

  /**
   * 是否为空
   * @return
   */
  isEmpty(): boolean;

  /**
   * 是否包含某个元素
   * @param element
   * @return
   */
  contains(element: E): boolean;

  /**
   * 添加元素到尾部
   * @param element
   */
  add(element: E): void;

  /**
   * 获取index位置的元素
   * @param index
   * @return
   */
  get(index: number): E;

  /**
   * 设置index位置的元素
   * @param index
   * @param element
   * @return 原来的元素ֵ
   */
  set(index: number, element: E): E;

  /**
   * 在index位置插入一个元素
   * @param index
   * @param element
   */
  add(index: number, element: E): void;

  /**
   * 删除index位置的元素
   * @param index
   * @return
   */
  remove(index: number): E;

  /**
   * 查看元素的索引
   * @param element
   * @return
   */
  indexOf(element: E): number;
}
