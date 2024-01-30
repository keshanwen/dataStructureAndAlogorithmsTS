import { TreeSet } from '../../DataStructure/set/index';
import { TreeMap } from '../../DataStructure/map/index'
import { LinkedList } from '../../DataStructure/linkedList/index'
import HashMap from 'hashmap';
import HashSet from 'hashset';


export interface WeightManager<E> {
  compare(w1: E, w2: E): number

  add(w1: E, w2: E): E

  zero(): E
}

export interface VertexVisitor<V> {
  visit(v: V): boolean
}

export class EdgeInfo<V,E> {
  from: V
  to: V
  weight: E
  constructor(from: V, to: V, weight: E) {
    this.from = from
    this.to = to
    this.weight = weight
  }

  getFrom(): V {
    return this.from
  }

  setFrom(from: V): void {
    this.from = from
  }

  getTo(): V {
    return this.to
  }

  setTo(to: V): void {
    this.to = to
  }

  getWeight(): E {
    return this.weight
  }

  setWeight(weight: E): void {
    this.weight = weight
  }

  toString(): string {
    return `EdgeInfo [from= ${this.from}, to= ${this.to}, weight=${this.weight} ]`
  }
}

export class PathInfo<V, E> {
  weight: E
  edgeInfos: LinkedList<EdgeInfo<V, E>> = new LinkedList<EdgeInfo<V, E>>()
  constructor(weight?: E) {
    this.weight = weight
  }

  getWeight(): E {
    return this.weight
  }

  setWeight(weight: E): void {
    this.weight = weight
  }

  getEdgeInfos(): LinkedList<EdgeInfo<V, E>> {
    return this.edgeInfos
  }

  setEdgeInfos(edgeInfos: LinkedList<EdgeInfo<V,E>>): void {
    this.edgeInfos = edgeInfos
  }

  toString(): string {
    return `PathInfo [weight= ${this.weight}, edgeInfos= ${this.edgeInfos}]`;
  }
}

export abstract class Graph<V, E> {
  protected weightManager: WeightManager<E>;

  constructor(weightManager?: WeightManager<E>) {
    this.weightManager = weightManager;
  }

  abstract edgesSize(): number;

  abstract verticesSize(): number;

  abstract addVertex(v: V): void;

  abstract addEdge(from: V, to: V, weight?: E): void;

  abstract removeVertex(v: V): void;

  abstract removeEdge(from: V, to: V): void;

  abstract bfs(begin: V, visitor: VertexVisitor<V>): void;

  abstract dfs(begin: V, Visitor: VertexVisitor<V>): void;

  abstract mst(): Set<EdgeInfo<V, E>>;

  abstract topologicalSort(): LinkedList<V>;

  abstract shortestPath(begin: V): Map<V, PathInfo<V, E>>;
}