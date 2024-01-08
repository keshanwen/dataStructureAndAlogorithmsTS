<script setup lang="ts">
import { CircleDeque } from './DataStructure/queue/index'

let arr = new CircleDeque<number>()

for (let i = 0; i < 18; i++) {
 arr.enQueueFront(i)
}

// console.log(arr.deQueueFront())
// console.log(arr.deQueueFront())
// console.log(arr.deQueueFront())
// console.log(arr.deQueueFront())
// console.log(arr.deQueueFront())
// console.log(arr.getFront())
// console.log(arr.rear())
console.log(arr.deQueueRear())
console.log(arr.deQueueRear())
console.log(arr.deQueueRear())


arr.toString()

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
