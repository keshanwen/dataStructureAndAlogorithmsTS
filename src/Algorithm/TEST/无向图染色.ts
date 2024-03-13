/*
  给一个无向图染色，可以填红黑两种颜色，必须保证相邻两个节点不能同时为红色，输出有多少种不同的染色方案?

  输入描述

  第一行输入M(图中节点数)N(边数)

  后续N行格式为:V1 V2表示一个V1到V2的边

  数据范围:1<=M<=15,0=N=M3，不能保证所有节点都是连通的

  输出描述

  输出一个数字表示染色方案的个数

  4 4
  1 2
  2 4
  3 4
  1 3
*/

const str = `
  4 4
  1 2
  2 4
  3 4
  1 3
`
const arr = str.split('\n').filter(item => item).map(item => item.trim())
const arr0 = arr[0].split(' ')
const allVer = Number(arr0[0]);
const allEdge = Number(arr0[1]);
const verRelation = arr.slice(1)

enum Color {
  'RED' = 'RED',
  'BLACK' = 'BLACK',
  'NONE' = 'NONE'
}

class Node {
  color: Color;
  value: number;
  in?: Node[];
  out?: Node[];
  constructor(value: number, color = Color.NONE) {
    this.value = value;
    this.color = color;
  }
}

const allNodes: Node[] = []

//  初始化节点
for (let i = 1; i <= allVer;i++) {
  const node = new Node(i)
  allNodes.push(node)
}

// 初始化节点关系
verRelation.forEach((item) => {
  const arr = item.split(' ')
  const fromIdenx = Number(arr[0]) - 1
  const toIndex = Number(arr[1]) - 1
  const fromNode = allNodes[fromIdenx];
  const toNode = allNodes[toIndex]
  if (fromNode.out?.length) {
    fromNode.out.push(toNode)
  } else {
    fromNode.out = [toNode]
  }
  if (toNode.in?.length) {
    toNode.in.push(fromNode)
  } else {
    toNode.in = [fromNode]
  }
})

let count = 0
let i = 0
let haveEdge = allNodes.filter(item => item.in?.length || item.out?.length)
const noneEdge = allVer - haveEdge.length

const colors = ['RED', 'BLACK']

colors.forEach((item) => {

})



export {

}