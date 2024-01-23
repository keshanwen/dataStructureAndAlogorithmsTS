<script setup lang="ts">
import { ListGraph } from './Algorithm/grapg/ListGraph'

const graph = new ListGraph()

graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")
graph.addVertex("G")
graph.addVertex("I")
graph.addVertex("H")


graph.addEdge("A", "B")
graph.addEdge("A", "F")
graph.addEdge("B", "C")
graph.addEdge("B", "I")
graph.addEdge("B", "G")
graph.addEdge("C", "I")
graph.addEdge("C", "D")
graph.addEdge("D", "I")
graph.addEdge("D", "G")
graph.addEdge("D", "E")
graph.addEdge("D", "H")
graph.addEdge("E", "H")
graph.addEdge("E", "F")
graph.addEdge("F", "G")
graph.addEdge("G", "H")

graph.print()
// console.log(graph.verticesSize())
// console.log(graph.edgesSize())



</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
