/*
有 n 件物品和一个最大承重为 W 的背包，每件物品的重量是 w(i) 价值是 v(i)

在保证总重量不超过 W 的前提下， 选择某些物品装入背包，背包的最大总价值是多少？
注意： 每个物品只有 1 件，也就是每个物品只能选择 0 件或者 1 件

假设 values 是价值数组， weights 是重量数组
编号为 k 的物品，价值是 values[k], 重量是 weights[k], k 属于 [0,n)

假设 dp(i,j) 是最大承重为 j,有前i件物品可选时的最大总价值。 i 属于[1,n]
j 属于 [1,W]

dp(i,0) dp(0, j)初始值都为 0

如果 j < weights[i - 1], 那么 dp(i, j) = dp(i - 1, j)

----> j < weights[i - 1] 说明第 i 件物品一定没有选中。
只有这一种结果

如果 j >= weights[i - 1] ,那么
dp(i, j) = max {
    dp(i - 1, j),
    dp(i - 1, j - wieghts[i - 1]) + values[i - 1]
}
----> j >= weights[i  -1], 说明 第 i 件物品可以被选中， 但是不一定要选中，
所以有两种可能，
1，第 i 件物品选中。
2，第 i 件物品没有选中。
*/

let values = [6, 3, 5, 4, 6];
let weights = [2, 2, 6, 5, 4];
let capacity = 10;

function maxValue1(values: number[], weights: number[], capacity: number) {
  let dp = new Array(values.length + 1).fill(new Array(capacity + 1).fill(0));

  for (let i = 1; i <= values.length; i++) {
    for (let j = 1; j <= capacity; j++) {
      if (j < weights[i - 1]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }
  console.table(dp);
  return dp[values.length][capacity];
}

function maxValue2(values: number[], weights: number[], capacity: number) {
  let dp = new Array(capacity + 1).fill(0);
  for (let i = 1; i <= values.length; i++) {
    for (let j = capacity; j >= 1; j--) {
      if (j < weights[i - 1]) continue;
      dp[j] = Math.max(dp[j], values[i - 1] + dp[j - weights[i - 1]]);
    }
  }
  console.log(dp, 'dp2~~~~');
  return dp[capacity];
}

function maxValue3(values: number[], weights: number[], capacity: number) {
  let dp = new Array(capacity + 1).fill(0);

  for (let i = 1; i <= values.length; i++) {
    for (let j = capacity; j >= weights[i - 1]; j--) {
      dp[j] = Math.max(dp[j], dp[j - weights[i - 1]] + values[i - 1]);
    }
  }
  console.log(dp, 'dp3~~~~');
  return dp[capacity];
}

// 如果返回-1，代表没法刚好凑到capacity这个容量
function maxValueExactly(
  values: number[],
  weights: number[],
  capacity: number
) {
  let dp = new Array(capacity + 1).fill(0);
  for (let j = 1; j <= capacity; j++) {
    dp[j] = Number.MIN_VALUE;
  }
  for (let i = 1; i <= values.length; i++) {
    for (let j = capacity; j >= weights[i - 1]; j--) {
      dp[j] = Math.max(dp[j], values[i - 1] + dp[j - weights[i - 1]]);
    }
  }
  return dp[capacity] < 0 ? -1 : dp[capacity];
}

// maxValue1(values, weights, capacity);
// maxValue2(values, weights, capacity)
// maxValue3(values, weights, capacity);
console.log(maxValueExactly(values, weights, capacity));

export {};