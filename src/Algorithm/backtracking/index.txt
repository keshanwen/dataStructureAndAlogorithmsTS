import { Node as TreeNode } from '@/DataStructure/tree/BinaryTree';

/*
 「回溯算法 backtracking algorithm」是一种通过穷举来解决问题的方法，它的核心思想是从一个初始状态出发，暴力搜索所有可能的解决方案，当遇到正确的解则将其记录，直到找到解或者尝试了所有可能的选择都无法找到解为止。

  之所以称之为回溯算法，是因为该算法在搜索解空间时会采用“尝试”与“回退”的策略。当算法在搜索过程中遇到某个状态无法继续前进或无法得到满足条件的解时，它会撤销上一步的选择，退回到之前的状态，并尝试其他可能的选择。

  复杂的回溯问题通常包含一个或多个约束条件，约束条件通常可用于“剪枝”

  回溯算法本质上是一种深度优先搜索算法，它尝试所有可能的解决方案直到找到满足条件的解。这种方法的优点在于能够找到所有可能的解决方案，而且在合理的剪枝操作下，具有很高的效率。

  然而，在处理大规模或者复杂问题时，回溯算法的运行效率可能难以接受。
*/

/* // 例题一: 给定一棵二叉树，搜索并记录所有值为  的节点，请返回节点列表。


function preOrder(root: Node | null, res: Node[]): void {
  if (root === null) {
    return;
  }
  if (root.val === 7) {
    // 记录解
    res.push(root);
  }
  preOrder(root.left, res);
  preOrder(root.right, res);
}

 */


/* // 在二叉树中搜索所有值为 7 的节点，请返回根节点到这些节点的路径。
function preOrder(
    root: TreeNode | null,
    path: TreeNode[],
    res: TreeNode[][]
): void {
    if (root === null) {
        return;
    }
    // 尝试
    path.push(root);
    if (root.val === 7) {
        // 记录解
        res.push([...path]);
    }
    preOrder(root.left, path, res);
    preOrder(root.right, path, res);
    // 回退
    path.pop();
} */


/* // 在二叉树中搜索所有值为  的节点，请返回根节点到这些节点的路径，并要求路径中不包含值为 3 的节点。
function preOrder(
    root: TreeNode | null,
    path: TreeNode[],
    res: TreeNode[][]
): void {
    // 剪枝
    if (root === null || root.val === 3) {
        return;
    }
    // 尝试
    path.push(root);
    if (root.val === 7) {
        // 记录解
        res.push([...path]);
    }
    preOrder(root.left, path, res);
    preOrder(root.right, path, res);
    // 回退
    path.pop();
}
 */

