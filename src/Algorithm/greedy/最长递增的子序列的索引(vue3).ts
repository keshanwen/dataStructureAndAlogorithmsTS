let arr = [5, 3, 4, 0];

function getSequence(arr: number[]): number[] {
  const len: number = arr.length;
  const result: number[] = [0]; // 索引 递增的序列
  const p: number[] = arr.slice(0); // 里面的内容无所谓 和 原本的数组相同 用来存放索引
  let start: number;
  let end: number;
  let middle: number;
  for (let i = 0; i < len; i++) {
    const arrI: number = arr[i];
    let resultIndex = result[result.length - 1];
    // 当前的值比上一个大，直接 push, 并且让这个人得记录他的前一个
    // 取到索引对应的值
    if (arr[resultIndex] < arrI) {
      p[i] = resultIndex; // 标记当前前一个对应的索引
      result.push(i);
      continue;
    }
    // 二分查找， 找到比当前值大的那一个
    start = 0;
    end = result.length - 1;
    while (start < end) {
      middle = (start + end) >> 1;
      if (arr[result[middle]] < arrI) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    // start / end 就是找到的位置
    if (arrI < arr[result[start]]) {
      // 如果相同 或者 比当前的还大就不换了
      if (start > 0) {
        // 才需要替换
        p[i] = result[start - 1]; // 要将替换的前一个记住
      }
      result[start] = i; // 思考： 这里为什么要替换呢？
    }
  }
  let len1 = result.length;
  let last = result[len1 - 1]; // 找到了最后一项
  // 根据前驱节点一个个向前查找（这里就可以很好的解释了为什么要记录 p 中的内容）
  // 此时的 result 的不一定是正确的最长递增子序列的索引， 但是根据最后一个节点的前驱节点一个个向前查找一定是
  while (len1-- > 0) {
    // 根据前驱节点一个个向前查找
    result[len1] = last;
    last = p[last];
  }

  return result;
}

const res = getSequence([2, 3, 1, 5, 6, 8, 7, 9, 4]);
console.log(res);

export {};
