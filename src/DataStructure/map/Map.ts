export interface Visitor<K,V> {
  stop?: Boolean;

  /**
   * @return 如果返回true，就代表停止遍历
   */
  visit(key:K, value: V): boolean;
}


export interface Map<K, V> {
  size(): number;

  isEmpty(): boolean;

  clear(): void;

  put(key: K, value: V): V;

  get(key: K): V;

  remove(key: K): V;

  containsKey(key: K): boolean;

  containsValue(value: V): boolean;

  traversal(visitor: Visitor<K,V>): void;
}
