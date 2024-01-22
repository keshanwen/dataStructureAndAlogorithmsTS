import { UnionFind } from './UnionFind'

export class UnionFind_QF extends UnionFind {
  constructor(capacity: number) {
    super(capacity);
  }

  /*
   * 父节点就是根节点
   */
  public find(v: number): number {
    this.rangeCheck(v)
    return this.parents[v]
  }

  /**
   * 将v1所在集合的所有元素，都嫁接到v2的父节点上
   */
  public union(v1: number, v2: number): void {
    let p1: number = this.find(v1)
    let p2: number = this.find(v2)

    if (p1 == p2) return

    for (let i = 0; i < this.parents.length; i++) {
      if (this.parents[i] == p1) {
        this.parents[i] = p2
      }
    }
  }
}