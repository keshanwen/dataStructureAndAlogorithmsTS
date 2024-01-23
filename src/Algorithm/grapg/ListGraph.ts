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

interface Comparator<E> {
  compare(e1: E, e2: E): number;
}

class Vertex<V, E> {
  value: V;
  inEdges: HashSet<Edge<V, E>> = new HashSet<Edge<V, E>>();
  outEdges: HashSet<Edge<V, E>> = new HashSet<Edge<V, E>>();

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
  vertices: HashMap<V, Vertex<V, E>> = new HashMap<V, Vertex<V, E>>();

  edges: HashSet<Edge<V, E>> = new HashSet<Edge<V, E>>();

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
    /*     this.vertices.traversal({
      visit(key: V, value: Vertex<V, E>) {
        console.log(key);
        console.log('out-------------');
        console.log(value.outEdges);
        console.log('in--------------');
        console.log(value.inEdges);
        return false;
      },
    }); */
    this.vertices.forEach((value: Vertex<V, E>, key: V) => {
      console.log(key);
      console.log('out-------------');
      console.log(value.outEdges.length);
      console.log('in--------------');
      console.log(value.inEdges);
    });
    console.log('[边]-----------------');
    this.edges.forEach((edge: Edge<V, E>) => {
      console.log(edge);
    });
  /*   this.edges.traversal({
      visit(edge: Edge<V, E>) {
        console.log(edge);
        return false;
      },
    }); */
  }

  edgesSize(): number {
    return this.edges.length;
  }

  verticesSize(): number {
    // return this.vertices.size();
    return this.vertices.size;
  }

  addVertex(v: V): void {
    /*    if (this.vertices.containsKey(v)) return;
    this.vertices.put(v, new Vertex(v)); */
    if (this.vertices.has(v)) return;
    this.vertices.set(v, new Vertex(v));
  }

  addEdge(from: V, to: V, weight?: E): void {
    let fromVertex: Vertex<V, E> = this.vertices.get(from);
    if (!fromVertex) {
      fromVertex = new Vertex(from);
      // this.vertices.put(from, fromVertex);
      this.vertices.set(from, fromVertex);
    }

    let toVertex: Vertex<V, E> = this.vertices.get(to);
    if (!toVertex) {
      toVertex = new Vertex(to);
      // this.vertices.put(to, toVertex);
      this.vertices.set(to, toVertex);
    }

    let edge: Edge<V, E> = new Edge(fromVertex, toVertex);
    edge.weight = weight;
    if (fromVertex.outEdges.remove(edge)) {
      toVertex.inEdges.remove(edge);
      this.edges.remove(edge);
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
    if (fromVertex.outEdges.remove(edge)) {
      toVertex.inEdges.remove(edge);
      this.edges.remove(edge);
    }
  }

  removeVertex(v: V): void {
    let vertex: Vertex<V, E> = this.vertices.remove(v);
    if (!vertex) return;

    let outEdges: HashSet<Edge<V, E>> = cloneDeep(vertex.outEdges);

    let _this = this;
    outEdges.forEach((edge: Edge<V, E>) => {
       edge.to.inEdges.remove(edge);
       // 将当前遍历到的元素 edge 从集合 vertex.outEdges 中删除掉
       vertex.outEdges.remove(edge);
       _this.edges.remove(edge);
    });
/*     outEdges.traversal({
      visit(edge: Edge<V, E>) {
        edge.to.inEdges.remove(edge);
        // 将当前遍历到的元素 edge 从集合 vertex.outEdges 中删除掉
        vertex.outEdges.remove(edge);
        _this.edges.remove(edge);
        return false;
      },
    }); */

    let inEdges: HashSet<Edge<V, E>> = cloneDeep(vertex.inEdges);
    inEdges.forEach((edge: Edge<V, E>) => {
        edge.from.outEdges.remove(edge);
        // 将当前遍历到的元素 edge 从集合vertex.inEdges 中删除掉
        vertex.inEdges.remove(edge);
        _this.edges.remove(edge);
    });
   /*  inEdges.traversal({
      visit(edge: Edge<V, E>) {
        edge.from.outEdges.remove(edge);
        // 将当前遍历到的元素 edge 从集合vertex.inEdges 中删除掉
        vertex.inEdges.remove(edge);
        _this.edges.remove(edge);
        return false;
      },
    }); */
  }

  bfs(begin: V, visitor: VertexVisitor<V>): void {
    if (!visitor) return;
    let beginVertex: Vertex<V, E> = this.vertices.get(begin);
    if (!beginVertex) return;

    let visitedVertices: HashSet<Vertex<V, E>> = new HashSet<Vertex<V, E>>();
    let queue: Queue<Vertex<V, E>> = new Queue<Vertex<V, E>>();
    queue.enQueue(beginVertex);
    visitedVertices.add(beginVertex);

    while (!queue.isEmpty()) {
      let vertex: Vertex<V, E> = queue.deQueue();
      if (visitor.visit(vertex.value)) return;

      vertex.outEdges.forEach((edge: Edge<V, E>) => {
        if (!visitedVertices.contains(edge.to)) {
          queue.enQueue(edge.to);
          visitedVertices.add(edge.to);
        }
      });

  /*     vertex.outEdges.traversal({
        visit(edge: Edge<V, E>) {
          if (!visitedVertices.contains(edge.to)) {
            queue.enQueue(edge.to);
            visitedVertices.add(edge.to);
          }
          return false;
        },
      }); */
    }
  }

  dfs(begin: V, visitor: VertexVisitor<V>): void {
    if (!visitor) return;
    let beginVertex: Vertex<V, E> = this.vertices.get(begin);
    if (!beginVertex) return;

    let visitedVertices: HashSet<Vertex<V, E>> = new HashSet<Vertex<V, E>>();
    let stack: Stack<Vertex<V, E>> = new Stack<Vertex<V, E>>();

    // 先访问起点
    stack.push(beginVertex);
    visitedVertices.add(beginVertex);
    if (visitor.visit(begin)) return;
    let breakDfs: boolean = false;

    while (!stack.isEmpty()) {
      if (breakDfs) return;
      let vertex: Vertex<V, E> = stack.pop();

      vertex.outEdges.forEach((edge: Edge<V, E>) => {
         if (visitedVertices.contains(edge.to)) {
           return false;
         } else {
           stack.push(edge.from);
           stack.push(edge.to);
           visitedVertices.add(edge.to);
           if (visitor.visit(edge.to.value)) {
             breakDfs = true;
           }
           return true;
         }
      });
      /* vertex.outEdges.traversal({
        visit(edge: Edge<V, E>) {
          if (visitedVertices.contains(edge.to)) {
            return false;
          } else {
            stack.push(edge.from);
            stack.push(edge.to);
            visitedVertices.add(edge.to);
            if (visitor.visit(edge.to.value)) {
              breakDfs = true;
            }
            return true;
          }
        },
      }); */
    }
  }
}
