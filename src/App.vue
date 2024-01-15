<script setup lang="ts">
import { TreeSet } from './DataStructure/set/index'


/* class Person {
  age: number;
  name: string
  constructor(age: number, name: string) {
    this.age = age
    this.name = name
  }
} */

let set = new TreeSet<number>()

set.add(1)
set.add(1)
set.add(2)
set.add(2)
set.add(3)
set.add(3)
set.add(3)
set.add(3)
set.add(3)
set.add(3)
for (let i = 0; i < 10; i++) {
  set.add(i)
}

set.remove(3)
console.log(set.size(), 'size')
console.log(set.isEmpty(), 'isEmpty')

console.log(set.contains(3), 'contains')

set.traversal({
  visit(element) {
    console.log(element)
      if (element == 6) return true
      return false
  },
})










</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
