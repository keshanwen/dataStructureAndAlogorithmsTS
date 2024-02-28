/*
给定一个共有  阶的楼梯，你每步可以上 1  阶或者 2  阶，请问有多少种方案可以爬到楼顶
1 2 3 4 5 6
1 2 3 5 8 13

由于每轮只能上 1 阶或 2 阶，因此当我们站在第 i 阶楼梯上时，上一轮只可能站在第 i - 1阶或第 i -2 阶上。换句话说，我们只能从第 i 阶或第 i - 2 阶迈向第 i 阶。

由此便可得出一个重要推论：爬到第 i - 1 阶的方案数加上爬到第 i - 2 阶的方案数就等于爬到第 i 阶的方案数。公式如下：
dp[i] = dp[i-1] + dp[i-2]

*/

/* 爬楼梯：动态规划 */
function climbingStairsDP(n: number): number {
  if (n === 1 || n === 2) return n;
  // 初始化 dp 表，用于存储子问题的解
  const dp = new Array(n + 1).fill(-1);
  // 初始状态：预设最小子问题的解
  dp[1] = 1;
  dp[2] = 2;
  // 状态转移：从较小子问题逐步求解较大子问题
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}


/*

动态规划常用术语
1，将数组 dp 称为「 表」， dp[i]表示状态 i 对应子问题的解。
2, 将最小子问题对应的状态（第 1 阶和第 2 阶楼梯）称为「初始状态」。
3, 将递推公式 dp[i] = dp[i - 1] + dp[i - 2] 称为「状态转移方程」。

*/

/*
爬楼梯：空间优化后的动态规划
这种空间优化技巧被称为“滚动变量”或“滚动数组”。
*/
function climbingStairsDPComp(n: number): number {
    if (n === 1 || n === 2) return n;
    let a = 1,
        b = 2;
    for (let i = 3; i <= n; i++) {
        const tmp = b;
        b = a + b;
        a = tmp;
    }
    return b;
}