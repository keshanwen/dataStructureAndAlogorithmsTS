function backtrack(
  row: number,
  n: number,
  state: string[][],
  res: string[][][],
  cols: boolean[],
  diags1: boolean[],
  diags2: boolean[]
): void {
  if (row === n) {
    res.push(state.map((row) => row.slice()))
    return
  }

  for (let col = 0; col < n; col++) {
    const diag1 = row - col + n - 1
    const diag2 = row + col
    if (!cols[col] && !diags1[diag1] && !diags2[diag2]) {
      state[row][col] = 'Q'
      cols[col] = diags1[diag1] = diags2[diag2] = true
      backtrack(row + 1, n, state, res, cols, diags1, diags2)
      state[row][col] = '#'
      cols[col] = diags1[diag1] = diags2[diag2] = false
    }
  }
}

/* 求解 n 皇后 */
function nQueens(n: number): string[][][] {
  const state = Array.from({ length: n }, () => Array(n).fill('#'))
  const cols = Array(n).fill(false)
  const diag1 = Array(2 * n - 1).fill(false)
  const diag2 = Array(2 * n - 1).fill(false)
  const res: string[][][] = []

  backtrack(0,n, state, res, cols, diag1, diag2)
  return res
}


console.log(nQueens(4))