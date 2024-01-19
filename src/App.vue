<script setup lang="ts">
import { MergeSort2 } from './Algorithm/sort/MergeSort'

let arr = []


for (let i = 100; i > 0; i--) {
  arr.push(i)
}

const sort = new MergeSort2<number>()


console.log(sort.sort(arr))



</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
