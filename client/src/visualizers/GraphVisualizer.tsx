import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Network } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export const GraphVisualizer: React.FC = () => {
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Graph: Vertices connected by edges. BFS uses Queue, DFS uses Stack.');

  const nodes: GraphNode[] = [
    { id: 'A', label: 'A', x: 80, y: 120 },
    { id: 'B', label: 'B', x: 220, y: 50 },
    { id: 'C', label: 'C', x: 220, y: 190 },
    { id: 'D', label: 'D', x: 380, y: 50 },
    { id: 'E', label: 'E', x: 380, y: 190 }
  ];

  const edges = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 5 },
    { from: 'C', to: 'E', weight: 3 },
    { from: 'D', to: 'E', weight: 1 }
  ];

  const runBFS = async () => {
    setVisitedNodes([]);
    setStatus('Initiating Breadth-First Search (BFS) using Queue...');
    const queue = ['A'];
    const visited = new Set<string>();

    const adj: Record<string, string[]> = {
      A: ['B', 'C'],
      B: ['D'],
      C: ['E'],
      D: ['E'],
      E: []
    };

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (!visited.has(curr)) {
        visited.add(curr);
        setActiveNode(curr);
        setVisitedNodes(Array.from(visited));
        setStatus(`BFS Queue Dequeue: Visiting Node [${curr}]`);
        await new Promise(r => setTimeout(r, 800));

        const neighbors = adj[curr] || [];
        for (let n of neighbors) {
          if (!visited.has(n)) queue.push(n);
        }
      }
    }

    setActiveNode(null);
    setStatus('BFS Traversal Complete! Visited Order: [A -> B -> C -> D -> E]');
  };

  return (
    <div className="bg-[#0b0f1e] border border-cyber-border rounded-xl p-6 shadow-2xl">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold font-display text-purple-400 flex items-center gap-2">
            <span>🕸️</span> Graph Traversal Visualizer (BFS & DFS)
          </h3>
          <p className="text-sm text-gray-400">Vertices connected by weighted edges for network modeling</p>
        </div>
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <button
            onClick={runBFS}
            className="bg-purple-600 text-white font-medium px-4 py-1.5 rounded-lg text-xs hover:bg-purple-500 flex items-center gap-1.5 shadow-lg shadow-purple-900/50"
          >
            <Play size={14} /> Run BFS
          </button>
        </div>
      </div>

      {/* SVG Edge & Node Canvas */}
      <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-4 min-h-[250px] relative overflow-hidden flex items-center justify-center">
        <svg className="w-full h-56 overflow-visible">
          {edges.map((e, idx) => {
            const n1 = nodes.find(n => n.id === e.from)!;
            const n2 = nodes.find(n => n.id === e.to)!;
            return (
              <g key={idx}>
                <line
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  stroke="#4b5563"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <text
                  x={(n1.x + n2.x) / 2}
                  y={(n1.y + n2.y) / 2 - 8}
                  fill="#9ca3af"
                  fontSize="12"
                  fontFamily="monospace"
                >
                  w={e.weight}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0">
          {nodes.map((n) => {
            const isVisited = visitedNodes.includes(n.id);
            const isActive = activeNode === n.id;
            return (
              <motion.div
                key={n.id}
                style={{ left: `${n.x}px`, top: `${n.y}px` }}
                animate={{ scale: isActive ? 1.25 : 1 }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-xl ${
                  isActive
                    ? 'bg-purple-500 text-white border-white shadow-[0_0_20px_rgba(168,85,247,0.8)]'
                    : isVisited
                    ? 'bg-teal-950 border-cyber-neon text-cyber-neon'
                    : 'bg-gray-900 text-white border-purple-500/50'
                }`}
              >
                {n.label}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-3 bg-black/40 border border-gray-800 rounded-lg text-sm text-purple-300 font-mono">
        {status}
      </div>
    </div>
  );
};
