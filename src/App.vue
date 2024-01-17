<script setup lang="ts">
import { PriorityQueue } from './DataStructure/queue/index'

class Person {
  constructor(public name: string, public age: number) {

  }
}

const queue = new PriorityQueue<Person>({
  compare(e1, e2) {
      return e1.age - e2.age
  },
})


for (let i = 6; i >= 0; i--) {
  queue.enQueue(new Person(`${i}`,i))
}

console.log(queue.front())






</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
