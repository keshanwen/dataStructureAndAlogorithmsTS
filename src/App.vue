<script setup lang="ts">
import { BinarySearch } from './Algorithm/sort/BinarySearch'


let arr = []
for (let i = 0; i < 10;i++) {
  arr.push(2*i)
}

const tool = new BinarySearch()

console.log(tool.indexOf(arr, 7))


console.log(tool.search(arr,7))



</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
