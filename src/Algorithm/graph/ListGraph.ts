import { TreeSet } from '../../DataStructure/set/index';
import { TreeMap } from '../../DataStructure/map/index';
import { LinkedList } from '../../DataStructure/linkedList/index';
import { Queue } from '../../DataStructure/queue/index'
import { Stack } from '../../DataStructure/stack/index'
import HashMap from 'hashmap'
import HashSet from 'hashset'


import {
  WeightManager,
  VertexVisitor,
  EdgeInfo,
  PathInfo,
  Graph,
} from './Graph';
import { hashCode } from 'hashCode';
import _ from 'lodash'


function cloneDeep(value: any) {
  return _.cloneDeep(value);
}

function isEqual(a: object,b: object):boolean {
  return _.isEqual(a,b)
}

interface Comparator<E> {
  compare(e1: E, e2: E): number;
}

class Vertex<V, E> {
  value: V;
  inEdges: Set<Edge<V, E>> = new Set<Edge<V, E>>();
  outEdges: Set<Edge<V, E>> = new Set<Edge<V, E>>();

  constructor(value: V) {
    this.value = value;
  }

  equals(obj: Object): boolean {
    return this.value == (<Vertex<V, E>>obj).value;
  }

  hashCode(): number {
    return this.value ? hashCode().value(this.value) : 0;
  }

  toString(): string {
    return this.value ? this.value.toString() : 'null';
  }
}

class Edge<V, E> {
  from: Vertex<V, E>

  to: Vertex<V, E>

  weight: E

  constructor(from: Vertex<V,E>, to: Vertex<V,E>) {
    this.from = from
    this.to = to
  }

  info(): EdgeInfo<V, E> {
    return new EdgeInfo(this.from.value, this.to.value, this.weight)
  }

  equals(obj: Object): boolean {
    let edge: Edge<V, E> = obj as Edge<V, E>
    return this.from == edge.from && this.to == edge.to
  }

  hashCode(): number {
    return hashCode().value(this.from) * 31 + hashCode().value(this.to);
  }

  toString(): string {
    return `Edge [from = ${this.from} to = ${this.to} weight = ${this.weight}]`
  }
}

export class ListGraph<V, E> extends Graph<V, E> {
  vertices: Map<V, Vertex<V, E>> = new Map<V, Vertex<V, E>>();

  edges: Set<Edge<V, E>> = new Set<Edge<V, E>>();

  edgeComparator: Comparator<Edge<V, E>> = {
    compare(e1: Edge<V, E>, e2: Edge<V, E>) {
      return (<WeightManager<E>>this.weightManager).compare(
        e1.weight,
        e2.weight
      );
    },
  };

  constructor(weightManager?: WeightManager<E>) {
    super(weightManager);
  }

  print(): void {
    console.log('[顶点]---------------');
    this.vertices.forEach((vertex: Vertex<V,E>,v: V) => {
      console.log(v)
      console.log('out~~~~~~~~~~~~~~~')
      console.log(vertex.outEdges)
      console.log('in~~~~~~~~~~~~~~~~')
      console.log(vertex.inEdges)
    })
    console.log('[边]-----------------')
    this.edges.forEach((edge: Edge<V,E>) => {
      console.log(edge)
    })
  }

  edgesSize(): number {
    return this.edges.size;
  }

  verticesSize(): number {
    return this.vertices.size;
  }

  addVertex(v: V): void {
    if (this.vertices.has(v)) return;
    this.vertices.set(v, new Vertex(v));
  }

  addEdge(from: V, to: V, weight?: E): void {
    let fromVertex: Vertex<V, E> = this.vertices.get(from);
    if (!fromVertex) {
      fromVertex = new Vertex(from);
      this.vertices.set(from, fromVertex);
    }

    let toVertex: Vertex<V, E> = this.vertices.get(to);
    if (!toVertex) {
      toVertex = new Vertex(to);
      this.vertices.set(to, toVertex);
    }

    let edge: Edge<V, E> = new Edge(fromVertex, toVertex);
    edge.weight = weight;
    if (fromVertex.outEdges.delete(edge)) {
      toVertex.inEdges.delete(edge);
      this.edges.delete(edge);
    }

    fromVertex.outEdges.add(edge);
    toVertex.inEdges.add(edge);
    this.edges.add(edge);
  }

  removeEdge(from: V, to: V): void {
    let fromVertex: Vertex<V, E> = this.vertices.get(from);
    if (!fromVertex) return;
    let toVertex: Vertex<V, E> = this.vertices.get(to);
    if (!toVertex) return;

    let edge: Edge<V, E> = new Edge(fromVertex, toVertex);

    for (let item of fromVertex.outEdges) {
      if (isEqual(item, edge)) {
        fromVertex.outEdges.delete(item)
        toVertex.inEdges.delete(item)
        this.edges.delete(item)
        break;
      }
    }
  }

  removeVertex(v: V): void {
    let vertex: Vertex<V, E> = this.vertices.get(v);
    if (!vertex) return;
    this.vertices.delete(v)

    // let outEdges: Set<Edge<V, E>> = cloneDeep(vertex.outEdges);
    let outEdges: Set<Edge<V, E>> = vertex.outEdges;

    let _this = this;
    outEdges.forEach((edge: Edge<V, E>) => {
       edge.to.inEdges.delete(edge);
       // 将当前遍历到的元素 edge 从集合 vertex.outEdges 中删除掉
       vertex.outEdges.delete(edge);
       _this.edges.delete(edge);
    });

    // let inEdges: Set<Edge<V, E>> = cloneDeep(vertex.inEdges);
    let inEdges: Set<Edge<V, E>> = vertex.inEdges;
    inEdges.forEach((edge: Edge<V, E>) => {
        edge.from.outEdges.delete(edge);
        // 将当前遍历到的元素 edge 从集合vertex.inEdges 中删除掉
        vertex.inEdges.delete(edge);
        _this.edges.delete(edge);
    });
  }

  bfs(begin: V, visitor: VertexVisitor<V>): void {
    if (!visitor) return;
    let beginVertex: Vertex<V, E> = this.vertices.get(begin);
    if (!beginVertex) return;

    let visitedVertices: Set<Vertex<V, E>> = new Set<Vertex<V, E>>();
    let queue: Queue<Vertex<V, E>> = new Queue<Vertex<V, E>>();
    queue.enQueue(beginVertex);
    visitedVertices.add(beginVertex);

    while (!queue.isEmpty()) {
      let vertex: Vertex<V, E> = queue.deQueue();
      if (visitor.visit(vertex.value)) return;

      vertex.outEdges.forEach((edge: Edge<V, E>) => {
        if (!visitedVertices.has(edge.to)) {
          queue.enQueue(edge.to);
          visitedVertices.add(edge.to);
        }
      });
    }
  }

  dfs(begin: V, visitor: VertexVisitor<V>): void {
    if (!visitor) return;
    let beginVertex: Vertex<V, E> = this.vertices.get(begin);
    if (!beginVertex) return;

    let visitedVertices: Set<Vertex<V, E>> = new Set<Vertex<V, E>>();
    let stack: Stack<Vertex<V, E>> = new Stack<Vertex<V, E>>();

    // 先访问起点
    stack.push(beginVertex);
    visitedVertices.add(beginVertex);
    if (visitor.visit(begin)) return;
    let breakDfs: boolean = false;

    while (!stack.isEmpty()) {
      if (breakDfs) return;
      let forEachBreak: boolean = false
      let vertex: Vertex<V, E> = stack.pop();

      vertex.outEdges.forEach((edge: Edge<V, E>) => {
         if (visitedVertices.has(edge.to)) {
           // return false;
         } else if (!forEachBreak) {
           stack.push(edge.from);
           stack.push(edge.to);
           visitedVertices.add(edge.to);
           if (visitor.visit(edge.to.value)) {
             breakDfs = true;
           }
           forEachBreak = true
         }
      });
    }
  }

  topologicalSort(): LinkedList<V> {
    let list: LinkedList<V> = new LinkedList<V>()
    let queue: Queue<Vertex<V, E>> = new Queue<Vertex<V, E>>()
    let ins: Map<Vertex<V, E>, number> = new Map<Vertex<V, E>, number>();
    // 初始化（将度为0 的节点都放入队列）
    this.vertices.forEach((vertex: Vertex<V,E>,v: V) => {
      let inNs: number = vertex.inEdges.size
      if (inNs == 0) {
        queue.enQueue(vertex)
      } else {
        ins.set(vertex,inNs)
      }
    })

    while (!queue.isEmpty()) {
      let vertex: Vertex<V, E> = queue.deQueue()
      // 放入返回结果中
      list.add(vertex.value)

      for (let edge of vertex.outEdges) {
        let toIn: number = ins.get(edge.to) - 1
        if (toIn == 0) {
          queue.enQueue(edge.to)
        } else {
          ins.set(edge.to, toIn)
        }
      }
    }

    return list
  }
}
