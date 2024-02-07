

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
    state.push(choices[i])
    backtrack(state, target - choices[i], choices, i, res)
    state.pop()
  }
}

function subsetSumI(nums: number[], target: number):number[][] {
  const state = []
  nums.sort((a, b) => a - b)
  const start = 0
  const res = []
  backtrack(state, target, nums, start, res)
  return res
}



//console.log(subsetSumI([3,4,5],9))