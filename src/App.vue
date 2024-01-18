<script setup lang="ts">
import { InsertionSort, InsertionSort2, InsertionSort3 } from './Algorithm/sort/InsertionSort'


let arr = [1,2,3,4,5,6,7,8,9,11,20,23,12,13,14,15]
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 20, 23, 12, 13, 14, 15]
let arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 20, 23, 12, 13, 14, 15]
// for (let i = 10; i >= 0; i--) {
//   arr.push(i)
//   arr2.push(i)
//   arr3.push(i)
// }

const sort = new InsertionSort(arr)
const sort2 = new InsertionSort2(arr2)
const sort3 = new InsertionSort3(arr3)


sort.toString()
sort2.toString()
sort3.toString()



</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
