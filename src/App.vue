<script setup lang="ts">
import { QuickSort } from './Algorithm/sort/QuickSort'


let arr = [1,2,3,4,5,6,7,8,9,11,20,23,12,13,14,15]

const sort = new QuickSort<number>(arr)

sort.toString()

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
