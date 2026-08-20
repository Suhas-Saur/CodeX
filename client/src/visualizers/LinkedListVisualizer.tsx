import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Trash2, RotateCcw } from 'lucide-react';

interface LLNode {
  id: string;
  value: number;
}

export const LinkedListVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<LLNode[]>([
    { id: '1', value: 10 },
    { id: '2', value: 25 },
    { id: '3', value: 42 },
    { id: '4', value: 89 }
  ]);
  const [newValue, setNewValue] = useState<string>('');
  const [status, setStatus] = useState<string>('Singly Linked List: Each node references the next node pointer.');

  const addHead = () => {
    const val = parseInt(newValue) || Math.floor(Math.random() * 90) + 10;
    const newNode = { id: `node_${Date.now()}`, value: val };
    setNodes([newNode, ...nodes]);
    setStatus(`Inserted new Node(${val}) at HEAD. Pointer updated in O(1) time.`);
    setNewValue('');
  };

  const addTail = () => {
    const val = parseInt(newValue) || Math.floor(Math.random() * 90) + 10;
    const newNode = { id: `node_${Date.now()}`, value: val };
    setNodes([...nodes, newNode]);
    setStatus(`Inserted new Node(${val}) at TAIL.`);
    setNewValue('');
  };

  const deleteHead = () => {
    if (nodes.length === 0) return;
    const removed = nodes[0];
    setNodes(nodes.slice(1));
    setStatus(`Removed HEAD Node(${removed.value}). Memory unlinked in O(1) time.`);
  };

  return (
    <div className="bg-[#0b0f1e] border border-cyber-border rounded-xl p-6 shadow-2xl">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold font-display text-cyber-pink flex items-center gap-2">
            <span>🔗</span> Linked List Pointer Visualizer
          </h3>
          <p className="text-sm text-gray-400">Non-contiguous memory allocation connected via pointers</p>
        </div>
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-20 bg-gray-900 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm"
            placeholder="Val"
          />
          <button
            onClick={addHead}
            className="bg-cyber-pink text-white font-medium px-3 py-1.5 rounded-lg text-xs hover:bg-pink-600 flex items-center gap-1"
          >
            <Plus size={14} /> Head
          </button>
          <button
            onClick={addTail}
            className="bg-purple-600 text-white font-medium px-3 py-1.5 rounded-lg text-xs hover:bg-purple-700 flex items-center gap-1"
          >
            <Plus size={14} /> Tail
          </button>
          <button
            onClick={deleteHead}
            className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-red-700 flex items-center gap-1"
          >
            <Trash2 size={14} /> Del Head
          </button>
        </div>
      </div>

      {/* Nodes Display */}
      <div className="flex items-center overflow-x-auto py-10 px-4 bg-gray-950/60 rounded-xl border border-gray-800/80 min-h-[160px]">
        <span className="text-xs font-mono font-bold text-cyber-neon mr-3 px-2 py-1 bg-teal-950/80 border border-teal-500/40 rounded">HEAD</span>
        
        <AnimatePresence>
          {nodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              <motion.div
                initial={{ scale: 0, y: -20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative flex items-center bg-gray-900 border border-cyber-pink/50 rounded-xl p-3 shadow-lg min-w-[110px]"
              >
                <div className="flex flex-col items-center border-r border-gray-700 pr-3">
                  <span className="text-[10px] text-gray-400 font-mono">Data</span>
                  <span className="text-lg font-bold font-mono text-white">{node.value}</span>
                </div>
                <div className="flex flex-col items-center pl-3">
                  <span className="text-[10px] text-gray-400 font-mono">Next</span>
                  <span className="text-[10px] font-mono text-cyber-neon">
                    {idx < nodes.length - 1 ? '0x' + (2000 + idx * 8) : 'NULL'}
                  </span>
                </div>
              </motion.div>

              {idx < nodes.length - 1 && (
                <div className="flex items-center px-2 text-cyber-pink animate-pulse">
                  <ArrowRight size={22} />
                </div>
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>

        {nodes.length === 0 && (
          <div className="text-gray-500 font-mono text-sm mx-auto">List is currently EMPTY (HEAD = NULL)</div>
        )}
      </div>

      <div className="mt-4 p-3 bg-black/40 border border-gray-800 rounded-lg text-sm text-pink-300 font-mono">
        {status}
      </div>
    </div>
  );
};
