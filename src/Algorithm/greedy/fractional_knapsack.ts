/*
  给定  个物品，第  个物品的重量为 、价值为  ，和一个容量为  的背包。每个物品只能选择一次，但可以选择物品的一部分，价值根据选择的重量比例计算，问在限定背包容量下背包中物品的最大价值。


1,将物品按照单位价值从高到低进行排序。
2,遍历所有物品，每轮贪心地选择单位价值最高的物品。
3,若剩余背包容量不足，则使用当前物品的一部分填满背包。

贪心策略： 优先选择单位价值更高的物品

*/


/* 物品 */
class Item {
    w: number; // 物品重量
    v: number; // 物品价值

    constructor(w: number, v: number) {
        this.w = w;
        this.v = v;
    }
}

/* 分数背包：贪心 */
function fractionalKnapsack(wgt: number[], val: number[], cap: number): number {
    // 创建物品列表，包含两个属性：重量、价值
    const items: Item[] = wgt.map((w, i) => new Item(w, val[i]));
    // 按照单位价值 item.v / item.w 从高到低进行排序
    items.sort((a, b) => b.v / b.w - a.v / a.w);
    // 循环贪心选择
    let res = 0;
    for (const item of items) {
        if (item.w <= cap) {
            // 若剩余容量充足，则将当前物品整个装进背包
            res += item.v;
            cap -= item.w;
        } else {
            // 若剩余容量不足，则将当前物品的一部分装进背包
            res += (item.v / item.w) * cap;
            // 已无剩余容量，因此跳出循环
            break;
        }
    }
    return res;
}
