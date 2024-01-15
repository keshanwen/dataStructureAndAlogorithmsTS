<script setup lang="ts">
import { AVLTree } from './DataStructure/tree/index'


/* class Person {
  age: number;
  name: string
  constructor(age: number, name: string) {
    this.age = age
    this.name = name
  }
} */

let tree = new AVLTree<number>()


tree.add(10)
tree.add(9)
tree.add(8)
tree.add(7)
tree.add(6)
tree.add(20)
tree.add(1)




tree.toString()

tree.levelOrder({
  visit(element) {
    console.log(element)
      return false
  },
})









</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
