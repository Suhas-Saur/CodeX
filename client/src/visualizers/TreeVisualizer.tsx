import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, RotateCcw } from 'lucide-react';

interface TreeNode {
  val: number;
  left?: TreeNode;
  right?: TreeNode;
  x?: number;
  y?: number;
}

export const TreeVisualizer: React.FC = () => {
  const [treeVal, setTreeVal] = useState<string>('');
  const [activeNodeVal, setActiveNodeVal] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('Binary Search Tree: Left child < Root < Right child property.');

  // Pre-configured balanced BST
  const [nodes, setNodes] = useState<number[]>([50, 30, 70, 20, 40, 60, 80]);

  const runInorder = async () => {
    setStatus('Running Inorder Traversal (Left -> Root -> Right)...');
    const sorted = [...nodes].sort((a, b) => a - b);
    for (let val of sorted) {
      setActiveNodeVal(val);
      setStatus(`Visiting Node(${val})`);
      await new Promise(r => setTimeout(r, 700));
    }
    setActiveNodeVal(null);
    setStatus(`Inorder Traversal Completed: [${sorted.join(', ')}]. Produces sorted order!`);
  };

  const addNode = () => {
    const v = parseInt(treeVal);
    if (!isNaN(v) && !nodes.includes(v)) {
      setNodes([...nodes, v]);
      setStatus(`Inserted ${v} into BST following comparison property.`);
      setTreeVal('');
    }
  };

  return (
    <div className="bg-[#0b0f1e] border border-cyber-border rounded-xl p-6 shadow-2xl">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold font-display text-emerald-400 flex items-center gap-2">
            <span>🌳</span> Binary Search Tree (BST) Visualizer
          </h3>
          <p className="text-sm text-gray-400">Hierarchical tree structure with O(log n) average search time</p>
        </div>
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <input
            type="number"
            value={treeVal}
            onChange={(e) => setTreeVal(e.target.value)}
            className="w-20 bg-gray-900 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm"
            placeholder="Val"
          />
          <button
            onClick={addNode}
            className="bg-emerald-600 text-white font-medium px-3 py-1.5 rounded-lg text-xs hover:bg-emerald-500 flex items-center gap-1"
          >
            <Plus size={14} /> Insert
          </button>
          <button
            onClick={runInorder}
            className="bg-cyber-neon text-black font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-teal-300 flex items-center gap-1"
          >
            <Play size={14} /> Inorder
          </button>
        </div>
      </div>

      {/* SVG Tree Graphical Render */}
      <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-4 min-h-[260px] flex items-center justify-center relative overflow-hidden">
        <svg className="w-full h-64 overflow-visible">
          {/* Static SVG Lines connecting nodes */}
          <line x1="50%" y1="40" x2="30%" y2="110" stroke="#374151" strokeWidth="2" />
          <line x1="50%" y1="40" x2="70%" y2="110" stroke="#374151" strokeWidth="2" />
          <line x1="30%" y1="110" x2="18%" y2="180" stroke="#374151" strokeWidth="2" />
          <line x1="30%" y1="110" x2="42%" y2="180" stroke="#374151" strokeWidth="2" />
          <line x1="70%" y1="110" x2="58%" y2="180" stroke="#374151" strokeWidth="2" />
          <line x1="70%" y1="110" x2="82%" y2="180" stroke="#374151" strokeWidth="2" />
        </svg>

        {/* Tree Nodes overlay */}
        <div className="absolute inset-0">
          <NodeCircle val={50} x="50%" y="30px" active={activeNodeVal === 50} />
          <NodeCircle val={30} x="30%" y="100px" active={activeNodeVal === 30} />
          <NodeCircle val={70} x="70%" y="100px" active={activeNodeVal === 70} />
          <NodeCircle val={20} x="18%" y="170px" active={activeNodeVal === 20} />
          <NodeCircle val={40} x="42%" y="170px" active={activeNodeVal === 40} />
          <NodeCircle val={60} x="58%" y="170px" active={activeNodeVal === 60} />
          <NodeCircle val={80} x="82%" y="170px" active={activeNodeVal === 80} />
        </div>
      </div>

      <div className="mt-4 p-3 bg-black/40 border border-gray-800 rounded-lg text-sm text-emerald-300 font-mono">
        {status}
      </div>
    </div>
  );
};

const NodeCircle: React.FC<{ val: number; x: string; y: string; active: boolean }> = ({ val, x, y, active }) => (
  <motion.div
    style={{ left: x, top: y }}
    animate={{ scale: active ? 1.3 : 1 }}
    className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-lg ${
      active
        ? 'bg-emerald-500 text-black border-white shadow-[0_0_20px_rgba(16,185,129,0.8)]'
        : 'bg-gray-900 text-white border-emerald-500/50'
    }`}
  >
    {val}
  </motion.div>
);
