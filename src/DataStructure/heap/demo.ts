/*
    给定索引 i
 ，其左子节点的索引为 2i + 1
 ，右子节点的索引为 2i + 2
 ，父节点的索引为 (i - 1) / 2（向下整除）。当索引越界时，表示空节点或节点不存在。

*/

class Heap {
  maxHeap: number[] = [];
  constructor() {}

  /* 访问堆顶元素 */
  peek(): number {
    return this.maxHeap[0];
  }

  /* 给定元素 val ，我们首先将其添加到堆底。添加之后，由于 val 可能大于堆中其他元素，堆的成立条件可能已被破坏，
    因此需要修复从插入节点到根节点的路径上的各个节点，这个操作被称为堆化（heapify）。*/
  /* 元素入堆 */
  push(val: number): void {
    // 添加节点
    this.maxHeap.push(val);
    // 从底至顶堆化
    this.siftUp(this.size() - 1);
  }

  /* 从节点 i 开始，从底至顶堆化 */
  siftUp(i: number): void {
    while (true) {
      // 获取节点 i 的父节点
      const p = this.parent(i);
      // 当“越过根节点”或“节点无须修复”时，结束堆化
      if (p < 0 || this.maxHeap[i] <= this.maxHeap[p]) break;
      // 交换两节点
      this.swap(i, p);
      // 循环向上堆化
      i = p;
    }
  }
  /*
        堆顶元素是二叉树的根节点，即列表首元素。如果我们直接从列表中删除首元素，那么二叉树中所有节点的索引都会发生变化，
        这将使得后续使用堆化进行修复变得困难。为了尽量减少元素索引的变动，我们采用以下操作步骤。
        1, 交换堆顶元素与堆底元素（交换根节点与最右叶节点）。
        2, 交换完成后，将堆底从列表中删除（注意，由于已经交换，因此实际上删除的是原来的堆顶元素）。
        3,从根节点开始，从顶至底执行堆化。
    */
  /* 元素出堆 */
  pop(): number {
    // 判空处理
    if (this.isEmpty()) throw new RangeError("Heap is empty.");
    // 交换根节点与最右叶节点（交换首元素与尾元素）
    this.swap(0, this.size() - 1);
    // 删除节点
    const val = this.maxHeap.pop();
    // 从顶至底堆化
    this.siftDown(0);
    // 返回堆顶元素
    return val;
  }

  /* 从节点 i 开始，从顶至底堆化 */
  siftDown(i: number): void {
    while (true) {
      // 判断节点 i, l, r 中值最大的节点，记为 ma
      const l = this.left(i),
        r = this.right(i);
      let ma = i;
      if (l < this.size() && this.maxHeap[l] > this.maxHeap[ma]) ma = l;
      if (r < this.size() && this.maxHeap[r] > this.maxHeap[ma]) ma = r;
      // 若节点 i 最大或索引 l, r 越界，则无须继续堆化，跳出
      if (ma === i) break;
      // 交换两节点
      this.swap(i, ma);
      // 循环向下堆化
      i = ma;
    }
  }

  swap(i1, i2) {
    const old = this.maxHeap[i1];
    this.maxHeap[i1] = this.maxHeap[i2];
    this.maxHeap[i2] = old;
  }

  size(): number {
    return this.maxHeap.length;
  }

  isEmpty(): boolean {
    return this.maxHeap.length === 0;
  }

  /* 获取左子节点的索引 */
  left(i: number): number {
    return 2 * i + 1;
  }

  /* 获取右子节点的索引 */
  right(i: number): number {
    return 2 * i + 2;
  }

  /* 获取父节点的索引 */
  parent(i: number): number {
    return Math.floor((i - 1) / 2); // 向下整除
  }
}
