import { AlgoStep } from '../../engine/types';

interface GraphData {
  nodes: Map<string, { x: number; y: number; label: string }>;
  edges: Map<string, { from: string; to: string; weight: number }>;
  directed: boolean;
  weighted: boolean;
}

function getAdjacencyList(graph: GraphData) {
  const adj = new Map<string, { to: string; weight: number; edgeId: string }[]>();
  for (const [id] of graph.nodes) {
    adj.set(id, []);
  }
  for (const [edgeId, edge] of graph.edges) {
    adj.get(edge.from)?.push({ to: edge.to, weight: edge.weight, edgeId });
    if (!graph.directed) {
      adj.get(edge.to)?.push({ to: edge.from, weight: edge.weight, edgeId });
    }
  }
  return adj;
}

export function bfsSteps(graph: GraphData, startId: string): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const adj = getAdjacencyList(graph);
  const queue: string[] = [];
  const visited = new Set<string>();

  queue.push(startId);
  visited.add(startId);

  steps.push({
    type: 'enqueue',
    description: `Start BFS from node ${graph.nodes.get(startId)?.label}. Enqueue it.`,
    nodeIds: [startId],
    edgeIds: [],
    extra: { queue: [...queue], visited: Array.from(visited) }
  });

  while (queue.length > 0) {
    const curr = queue.shift()!;
    steps.push({
      type: 'dequeue',
      description: `Dequeue node ${graph.nodes.get(curr)?.label} and explore its neighbors.`,
      nodeIds: [curr],
      edgeIds: [],
      extra: { queue: [...queue], visited: Array.from(visited), currentNode: curr }
    });

    const neighbors = adj.get(curr) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.to)) {
        visited.add(neighbor.to);
        queue.push(neighbor.to);
        steps.push({
          type: 'enqueue',
          description: `Found unvisited neighbor ${graph.nodes.get(neighbor.to)?.label}. Enqueue it.`,
          nodeIds: [neighbor.to],
          edgeIds: [neighbor.edgeId],
          extra: { queue: [...queue], visited: Array.from(visited), currentNode: curr }
        });
      }
    }
  }
  
  steps.push({
    type: 'info',
    description: 'BFS completed.',
    nodeIds: Array.from(visited),
    edgeIds: [],
    extra: { queue: [], visited: Array.from(visited) }
  });

  return steps;
}

export function dfsSteps(graph: GraphData, startId: string): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const adj = getAdjacencyList(graph);
  const visited = new Set<string>();
  const stack: string[] = [];

  function dfs(node: string) {
    visited.add(node);
    stack.push(node);
    steps.push({
      type: 'visit',
      description: `Visiting node ${graph.nodes.get(node)?.label}.`,
      nodeIds: [node],
      edgeIds: [],
      extra: { stack: [...stack], visited: Array.from(visited), currentNode: node }
    });

    const neighbors = adj.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.to)) {
        steps.push({
          type: 'compare',
          description: `Exploring edge to unvisited neighbor ${graph.nodes.get(neighbor.to)?.label}.`,
          nodeIds: [neighbor.to],
          edgeIds: [neighbor.edgeId],
          extra: { stack: [...stack], visited: Array.from(visited), currentNode: node }
        });
        dfs(neighbor.to);
      }
    }
    stack.pop();
    steps.push({
      type: 'info',
      description: `Backtracking from node ${graph.nodes.get(node)?.label}.`,
      nodeIds: [node],
      edgeIds: [],
      extra: { stack: [...stack], visited: Array.from(visited), currentNode: node }
    });
  }

  dfs(startId);

  steps.push({
    type: 'info',
    description: 'DFS completed.',
    nodeIds: Array.from(visited),
    edgeIds: [],
    extra: { stack: [], visited: Array.from(visited) }
  });

  return steps;
}

export function dijkstraSteps(graph: GraphData, startId: string): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const adj = getAdjacencyList(graph);
  const distances: Record<string, number> = {};
  const parents: Record<string, string | null> = {};
  const visited = new Set<string>();

  for (const [id] of graph.nodes) {
    distances[id] = Infinity;
    parents[id] = null;
  }
  distances[startId] = 0;

  steps.push({
    type: 'setDistance',
    description: `Initialize distances. Set distance of start node ${graph.nodes.get(startId)?.label} to 0.`,
    nodeIds: [startId],
    edgeIds: [],
    extra: { distances: { ...distances }, parents: { ...parents }, visited: Array.from(visited) }
  });

  while (visited.size < graph.nodes.size) {
    let minDistance = Infinity;
    let u: string | null = null;
    for (const [id, dist] of Object.entries(distances)) {
      if (!visited.has(id) && dist < minDistance) {
        minDistance = dist;
        u = id;
      }
    }

    if (u === null) break; 
    visited.add(u);

    steps.push({
      type: 'visit',
      description: `Select unvisited node ${graph.nodes.get(u)?.label} with min distance ${minDistance}.`,
      nodeIds: [u],
      edgeIds: [],
      extra: { distances: { ...distances }, parents: { ...parents }, visited: Array.from(visited), currentNode: u }
    });

    const neighbors = adj.get(u) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.to)) {
        const alt = distances[u] + neighbor.weight;
        steps.push({
          type: 'compare',
          description: `Check neighbor ${graph.nodes.get(neighbor.to)?.label} through edge weight ${neighbor.weight}. Path length = ${alt}.`,
          nodeIds: [u, neighbor.to],
          edgeIds: [neighbor.edgeId],
          extra: { distances: { ...distances }, parents: { ...parents }, visited: Array.from(visited), currentNode: u }
        });

        if (alt < distances[neighbor.to]) {
          distances[neighbor.to] = alt;
          parents[neighbor.to] = u;
          steps.push({
            type: 'relax',
            description: `Relax edge: update distance of ${graph.nodes.get(neighbor.to)?.label} to ${alt}.`,
            nodeIds: [neighbor.to],
            edgeIds: [neighbor.edgeId],
            extra: { distances: { ...distances }, parents: { ...parents }, visited: Array.from(visited), currentNode: u, relaxed: true }
          });
        }
      }
    }
  }

  steps.push({
    type: 'info',
    description: "Dijkstra's algorithm completed.",
    nodeIds: Array.from(visited),
    edgeIds: [],
    extra: { distances: { ...distances }, parents: { ...parents }, visited: Array.from(visited) }
  });

  return steps;
}

export function bellmanFordSteps(graph: GraphData, startId: string): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const distances: Record<string, number> = {};
  const parents: Record<string, string | null> = {};

  for (const [id] of graph.nodes) {
    distances[id] = Infinity;
    parents[id] = null;
  }
  distances[startId] = 0;

  steps.push({
    type: 'setDistance',
    description: `Initialize distances. Start node ${graph.nodes.get(startId)?.label} = 0.`,
    nodeIds: [startId],
    edgeIds: [],
    extra: { distances: { ...distances }, parents: { ...parents } }
  });

  const nodeIds = Array.from(graph.nodes.keys());
  const edgesArray = Array.from(graph.edges.entries());

  for (let i = 1; i < nodeIds.length; i++) {
    let anyRelaxed = false;
    for (const [edgeId, edge] of edgesArray) {
      const u = edge.from;
      const v = edge.to;
      const w = edge.weight;

      if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
        distances[v] = distances[u] + w;
        parents[v] = u;
        anyRelaxed = true;
        steps.push({
          type: 'relax',
          description: `Relax edge ${graph.nodes.get(u)?.label} -> ${graph.nodes.get(v)?.label}. Update distance to ${distances[v]}.`,
          nodeIds: [u, v],
          edgeIds: [edgeId],
          extra: { distances: { ...distances }, parents: { ...parents }, relaxed: true }
        });
      }
    }
    if (!anyRelaxed) break;
  }

  steps.push({
    type: 'info',
    description: 'Bellman-Ford algorithm completed.',
    nodeIds: [],
    edgeIds: [],
    extra: { distances: { ...distances }, parents: { ...parents } }
  });

  return steps;
}

export function primMSTSteps(graph: GraphData): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const adj = getAdjacencyList(graph);
  const visited = new Set<string>();
  const mstEdges: string[] = [];
  
  if (graph.nodes.size === 0) return steps;
  
  const startId = Array.from(graph.nodes.keys())[0];
  visited.add(startId);
  
  steps.push({
    type: 'visit',
    description: `Start Prim's MST from node ${graph.nodes.get(startId)?.label}.`,
    nodeIds: [startId],
    edgeIds: [],
    extra: { visited: Array.from(visited), mstEdges: [...mstEdges] }
  });

  while (visited.size < graph.nodes.size) {
    let minEdge: { u: string, v: string, weight: number, edgeId: string } | null = null;
    
    for (const u of visited) {
      const neighbors = adj.get(u) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.to)) {
          if (!minEdge || neighbor.weight < minEdge.weight) {
            minEdge = { u, v: neighbor.to, weight: neighbor.weight, edgeId: neighbor.edgeId };
          }
        }
      }
    }

    if (!minEdge) break;

    visited.add(minEdge.v);
    mstEdges.push(minEdge.edgeId);
    
    steps.push({
      type: 'markMST',
      description: `Add edge ${graph.nodes.get(minEdge.u)?.label}-${graph.nodes.get(minEdge.v)?.label} to MST (weight ${minEdge.weight}).`,
      nodeIds: [minEdge.u, minEdge.v],
      edgeIds: [minEdge.edgeId],
      extra: { visited: Array.from(visited), mstEdges: [...mstEdges] }
    });
  }

  steps.push({
    type: 'info',
    description: "Prim's MST completed.",
    nodeIds: Array.from(visited),
    edgeIds: [...mstEdges],
    extra: { visited: Array.from(visited), mstEdges: [...mstEdges] }
  });

  return steps;
}

export function kruskalMSTSteps(graph: GraphData): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const edges = Array.from(graph.edges.entries()).map(([id, edge]) => ({ id, ...edge }));
  edges.sort((a, b) => a.weight - b.weight);
  
  const parent = new Map<string, string>();
  for (const [id] of graph.nodes) {
    parent.set(id, id);
  }
  
  function find(i: string): string {
    if (parent.get(i) === i) return i;
    const p = find(parent.get(i)!);
    parent.set(i, p);
    return p;
  }
  
  function union(i: string, j: string) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent.set(rootI, rootJ);
    }
  }

  const mstEdges: string[] = [];
  
  for (const edge of edges) {
    steps.push({
      type: 'compare',
      description: `Consider edge ${graph.nodes.get(edge.from)?.label}-${graph.nodes.get(edge.to)?.label} (weight ${edge.weight}).`,
      nodeIds: [edge.from, edge.to],
      edgeIds: [edge.id],
      extra: { mstEdges: [...mstEdges] }
    });
    
    if (find(edge.from) !== find(edge.to)) {
      union(edge.from, edge.to);
      mstEdges.push(edge.id);
      steps.push({
        type: 'markMST',
        description: `Add edge ${graph.nodes.get(edge.from)?.label}-${graph.nodes.get(edge.to)?.label} to MST.`,
        nodeIds: [edge.from, edge.to],
        edgeIds: [edge.id],
        extra: { mstEdges: [...mstEdges] }
      });
    } else {
      steps.push({
        type: 'info',
        description: `Edge ${graph.nodes.get(edge.from)?.label}-${graph.nodes.get(edge.to)?.label} forms a cycle. Skip.`,
        nodeIds: [edge.from, edge.to],
        edgeIds: [edge.id],
        extra: { mstEdges: [...mstEdges] }
      });
    }
  }

  return steps;
}

export function topologicalSortSteps(graph: GraphData): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const adj = getAdjacencyList(graph);
  const inDegree = new Map<string, number>();
  
  for (const [id] of graph.nodes) inDegree.set(id, 0);
  
  for (const [id, edge] of graph.edges) {
    inDegree.set(edge.to, (inDegree.get(edge.to) || 0) + 1);
  }
  
  const queue: string[] = [];
  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(id);
  }
  
  const sorted: string[] = [];
  
  while (queue.length > 0) {
    const u = queue.shift()!;
    sorted.push(u);
    steps.push({
      type: 'visit',
      description: `Node ${graph.nodes.get(u)?.label} has in-degree 0. Add to sorted list.`,
      nodeIds: [u],
      edgeIds: [],
      extra: { visited: [...sorted], queue: [...queue] }
    });
    
    const neighbors = adj.get(u) || [];
    for (const neighbor of neighbors) {
      const d = inDegree.get(neighbor.to)! - 1;
      inDegree.set(neighbor.to, d);
      steps.push({
        type: 'relax',
        description: `Reduce in-degree of ${graph.nodes.get(neighbor.to)?.label} to ${d}.`,
        nodeIds: [neighbor.to],
        edgeIds: [neighbor.edgeId],
        extra: { visited: [...sorted], queue: [...queue] }
      });
      if (d === 0) queue.push(neighbor.to);
    }
  }
  
  return steps;
}

export function detectCycleSteps(graph: GraphData): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const adj = getAdjacencyList(graph);
  const visited = new Set<string>();
  const recStack = new Set<string>();
  
  let cycleFound = false;

  function dfs(node: string, parent: string | null) {
    if (cycleFound) return;
    
    visited.add(node);
    if (graph.directed) recStack.add(node);
    
    steps.push({
      type: 'visit',
      description: `Visiting node ${graph.nodes.get(node)?.label}.`,
      nodeIds: [node],
      edgeIds: [],
      extra: { visited: Array.from(visited), stack: Array.from(recStack) }
    });

    const neighbors = adj.get(node) || [];
    for (const neighbor of neighbors) {
      if (cycleFound) break;
      
      if (!visited.has(neighbor.to)) {
        dfs(neighbor.to, node);
      } else if (graph.directed && recStack.has(neighbor.to)) {
        cycleFound = true;
        steps.push({
          type: 'found',
          description: `Cycle detected: back-edge to ${graph.nodes.get(neighbor.to)?.label}!`,
          nodeIds: [node, neighbor.to],
          edgeIds: [neighbor.edgeId],
          extra: { visited: Array.from(visited), stack: Array.from(recStack) }
        });
      } else if (!graph.directed && neighbor.to !== parent) {
        cycleFound = true;
        steps.push({
          type: 'found',
          description: `Cycle detected: edge to already visited ${graph.nodes.get(neighbor.to)?.label} (not parent)!`,
          nodeIds: [node, neighbor.to],
          edgeIds: [neighbor.edgeId],
          extra: { visited: Array.from(visited), stack: Array.from(recStack) }
        });
      }
    }
    
    if (graph.directed) recStack.delete(node);
  }

  for (const [id] of graph.nodes) {
    if (!visited.has(id)) {
      dfs(id, null);
    }
  }

  if (!cycleFound) {
    steps.push({
      type: 'info',
      description: 'No cycles detected in the graph.',
      nodeIds: [],
      edgeIds: [],
      extra: { visited: Array.from(visited) }
    });
  }

  return steps;
}
