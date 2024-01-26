/**
 * 求解[begin, end)中最大连续子序列的和
 * T(n) = T(n/2) + T(n/2) + O(n)
 * T(n) = 2T(n/2) + O(n)
 * logba = 1  d = 1
 */

function maxSubArray(nums: number[]) {
  if (!nums || nums.length == 0) return 0
  return count(nums,0,nums.length)
}

function count(nums: number[], begin: number, end: number) {
  if (end - begin < 2) return nums[begin]
  let mid: number = (begin + end) >> 1
  let leftMax: number = nums[mid - 1]
  let leftSum: number = leftMax
  for (let i = mid - 2; i >= begin; i--) {
    leftSum += nums[i]
    leftMax = Math.max(leftMax, leftSum)
  }
  let rightMax: number = nums[mid]
  let rightSum: number = rightMax
  for (let i = mid + 1; i < end;i++) {
    rightSum += nums[i]
    rightMax = Math.max(rightMax, rightSum)
  }
  return Math.max(leftMax + rightMax, Math.max(
    count(nums, begin, mid),
    count(nums, mid,end)
  ))
}


function maxSubArray2(nums: number[]) {
  if (!nums || nums.length == 0) return 0;
  let max: number = -Infinity
  for (let begin = 0; begin < nums.length; begin++) {
    let sum: number = 0
    for (let end = begin; end < nums.length; end++) {
      // sum 是 [begin, end] 的和
      sum += nums[end]
      max = Math.max(max,sum)
    }
  }
  return max
}

function maxSubArray3(nums: number[]) {
  if (!nums || nums.length == 0) return 0;
  let max: number = -Infinity;
  for (let begin = 0; begin < nums.length; begin++) {
    for (let end = begin; end < nums.length; end++) {
      let sum: number = 0
      for (let i = begin; i <= end; i++) {
        sum += nums[i]
      }
      max = Math.max(max,sum)
    }
  }
  return max;
}


console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray2([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray3([-2, 1, -3, 4, -1, 2, 1, -5, 4]));