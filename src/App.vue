<script setup lang="ts">
import { BubbleSort, BubbleSort2, BubbleSort3 } from './Algorithm/sort/BubbleSort'


class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

let arr = [10, 5, 6, 7, 8, 4, 3, 5, 2, 1, 9]
let arr2 = [10, 5, 6, 7, 8, 4, 3, 5, 2, 1, 9]
let arr3 = [10, 5, 6, 7, 8, 4, 3, 5, 2, 1, 9]
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


const sort = new BubbleSort<number>(arr)
const sort2 = new BubbleSort2<number>(arr2)
const sort3 = new BubbleSort3(arr3)

sort.toString()
sort2.toString()
sort3.toString()






</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
