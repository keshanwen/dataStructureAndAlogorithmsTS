<script setup lang="ts">
import { BinaryHeap } from './DataStructure/heap/index'

class Person {
  constructor(public name: string, public age: number) {

  }
}



const heap = new BinaryHeap<Person>({
  compare(e1,e2) {
    return  e1.age - e2.age
  }
})

for (let i = 6; i >= 0; i--) {
  heap.add(new Person(`${i}`,i))
}

console.log(heap.remove())
console.log(heap.remove())
console.log(heap.remove())
console.log(heap.remove())
console.log(heap.remove())
console.log(heap.remove())

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
