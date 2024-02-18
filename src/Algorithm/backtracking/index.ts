

/* 回溯算法：子集和 II */
function backtrack(
    state: number[],
    target: number,
    choices: number[],
    start: number,
    res: number[][]
): void {
  if (target === 0) {
    res.push([...state])
    return
  }
  for (let i = start; i < choices.length;i++) {
    if (target - choices[i] < 0) {
      break
    }
    if (i > start && choices[i] === choices[i-1]) {
      continue
    }
    state.push(choices[i])
    backtrack(state, target - choices[i], choices, i + 1, res)
    state.pop()
  }
}

/* 求解子集和 II */
function subsetSumII(nums: number[], target: number): number[][] {
  const state = []
  nums.sort((a, b) => a - b)
  const start = 0
  const res = []
  backtrack(state, target, nums, start, res)
  return res
}


console.log(subsetSumII([3, 4, 5], 9));
