<script setup lang="ts">
import { Deque } from './DataStructure/queue/index'

let arr = new Deque<number>()

for (let i = 0; i < 10; i++) {
  //  arr.enQueue(i)
  // arr.enQueueRear(i)
  arr.enQueueFront(i)
}
// arr.clear()
// console.log(arr.deQueueRear())
// console.log(arr.deQueueFront())
// console.log(arr.front())
// console.log(arr.front())
// console.log(arr.rear())
console.log(arr.size())
console.log(arr.isEmpty())

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
