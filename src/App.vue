<script setup lang="ts">
import { ArrayList } from './DataStructure/linkedList/index'

let arr = new ArrayList<number>()

for (let i = 0; i < 6; i++) {
  arr.add(i)
}

arr.toString()

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
