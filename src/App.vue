<script setup lang="ts">
import { HeapSort } from './Algorithm/sort/HeapSort'

let arr = [3,467,78,,8,6,4,2,1,0]


const sort = new HeapSort<number>(arr)

sort.toString()



</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
