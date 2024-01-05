<script setup lang="ts">
import { CircleLinkedList } from './DataStructure/linkedList/index'

let arr = new CircleLinkedList<number>()

for (let i = 0; i < 4; i++) {
  arr.add(i)
}
arr.reset()
console.log(arr.next())
console.log(arr.next())
console.log(arr.next())
console.log(arr.next())
console.log(arr.next())

// arr.toString()

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
