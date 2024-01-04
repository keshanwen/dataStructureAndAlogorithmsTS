<script setup lang="ts">
import { LinkedList } from './DataStructure/linkedList/index'

let list = new LinkedList()

for (let i = 0; i < 4; i++) {
  list.add(i)
}


list.toString()

</script>

<template>
  <div></div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
