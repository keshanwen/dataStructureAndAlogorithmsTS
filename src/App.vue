<script setup lang="ts">
import { GenericUnionFind } from './Algorithm/union/index'

const union = new GenericUnionFind<number>()

union.makeSet(8)
union.makeSet(24)
union.makeSet(25)
union.makeSet(26)

union.union(8, 24)
union.union(24, 25)
union.union(25,26)


console.log(union.isSame(8, 26))
console.log(union.find(26))
console.log(union.find(25))

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
