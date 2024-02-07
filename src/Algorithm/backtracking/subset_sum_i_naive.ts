// 给定一个正整数数组 nums 和一个目标正整数 target ，请找出所有可能的组合，使得组合中的元素和等于 target 。给定数组无重复元素，每个元素可以被选取多次。请以列表形式返回这些组合，列表中不应包含重复组合。
/* 回溯算法：子集和 I */
/* function backtrack(
    state: number[],
    target: number,
    total: number,
    choices: number[],
    res: number[][]
): void {
    // 子集和等于 target 时，记录解
    if (total === target) {
        res.push([...state]);
        return;
    }
    // 遍历所有选择
    for (let i = 0; i < choices.length; i++) {
        // 剪枝：若子集和超过 target ，则跳过该选择
        if (total + choices[i] > target) {
            continue;
        }
        // 尝试：做出选择，更新元素和 total
        state.push(choices[i]);
        // 进行下一轮选择
        backtrack(state, target, total + choices[i], choices, res);
        // 回退：撤销选择，恢复到之前的状态
        state.pop();
    }
} */

/* 求解子集和 I（包含重复子集） */
/* function subsetSumINaive(nums: number[], target: number): number[][] {
    const state = []; // 状态（子集）
    const total = 0; // 子集和
    const res = []; // 结果列表（子集列表）
    backtrack(state, target, total, nums, res);
    return res;
} */

/* 回溯算法：子集和 I */
function backtrack(
  state: number[],
  target: number,
  choices: number[],
  start: number,
  res: number[][]
): void {
  // 子集和等于 target 时，记录解
  if (target === 0) {
    res.push([...state]);
    return;
  }
  // 遍历所有选择
  // 剪枝二：从 start 开始遍历，避免生成重复子集
  for (let i = start; i < choices.length; i++) {
    // 剪枝一：若子集和超过 target ，则直接结束循环
    // 这是因为数组已排序，后边元素更大，子集和一定超过 target
    if (target - choices[i] < 0) {
      break;
    }
    // 尝试：做出选择，更新 target, start
    state.push(choices[i]);
    // 进行下一轮选择
    backtrack(state, target - choices[i], choices, i, res);
    // 回退：撤销选择，恢复到之前的状态
    state.pop();
  }
}

/* 求解子集和 I */
function subsetSumI(nums: number[], target: number): number[][] {
  const state = []; // 状态（子集）
  nums.sort((a, b) => a - b); // 对 nums 进行排序
  const start = 0; // 遍历起始点
  const res = []; // 结果列表（子集列表）
  backtrack(state, target, nums, start, res);
  return res;
}



export { }