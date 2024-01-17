<script setup lang="ts">
import { BinaryHeap } from './DataStructure/heap/index'

const heap = new BinaryHeap<number>([2, 10, 8, 100, 6, 4, 12])

heap.add(200)
heap.replace(140)

console.log(heap.get())

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
