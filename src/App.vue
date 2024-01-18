<script setup lang="ts">
import { SelectionSort } from './Algorithm/sort/SelectionSort'


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


const sort = new SelectionSort<number>(arr)

sort.toString()





</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
