<script setup lang="ts">
import { TreeMap } from './DataStructure/map/index'


/* class Person {
  age: number;
  name: string
  constructor(age: number, name: string) {
    this.age = age
    this.name = name
  }
} */

const map = new TreeMap<number, string>()

map.put(100, '100')
map.put(1,'aaaa')
map.put(2, 'bb')
map.put(3, 'c')
map.put(1, '1')
// map.put(2, '2')
map.put(3, '3')

// console.log(map.remove(3))
console.log(map.size(), 'size~~~~')
console.log(map.isEmpty())
console.log(map.containsKey(3))
console.log(map.containsValue('bb'))



map.toString()

map.traversal({
  visit(key, value) {
    console.log(key, value, '!!!!')
    if (key == 3) {
      console.log('key~~~~~')
      return true
    }
    return false
  },
})










</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
