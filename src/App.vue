<script setup lang="ts">
import { ArrayList } from './DataStructure/linkedList/index'

let arr = new ArrayList<number>()

for (let i = 0; i < 11; i++) {
  arr.add(i)
}
arr.remove(0)
arr.remove(1)
arr.remove(2)
arr.remove(3)
arr.remove(4)
arr.remove(5)

arr.toString()

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
