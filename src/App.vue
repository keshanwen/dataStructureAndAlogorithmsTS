<script setup lang="ts">
import { SignleLinkedList } from './DataStructure/linkedList/index'

let arr = new SignleLinkedList<number>()

for (let i = 0; i < 3; i++) {
  arr.add(i)
}

console.log(arr.indexOf(1))

arr.toString()

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
