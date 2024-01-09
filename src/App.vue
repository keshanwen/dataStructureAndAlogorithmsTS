<script setup lang="ts">
import { BinarySearchTree } from './DataStructure/tree/index'

let tree = new BinarySearchTree<number>()

// 10 8 12 11 20 6  9 100
tree.add(10)
tree.add(8)
tree.add(12)
tree.add(11)
tree.add(20)
tree.add(6)
tree.add(9)
tree.add(100)

tree.remove(8)

tree.toString()
console.log(tree.contains(8))






</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
