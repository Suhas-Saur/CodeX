import React, { useState, useEffect } from 'react';
import { TreeNode, AlgoStep } from '../../engine/types';
import { bstInsertSteps, bstDeleteSteps, bstSearchSteps, bstMinSteps, bstMaxSteps } from './treeAlgorithms';

export const BSTVisualizer: React.FC = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  
  const layoutTree = (node: TreeNode | null, x: number, y: number, spread: number): void => {
    if (!node) return;
    node.x = x;
    node.y = y;
    layoutTree(node.left || null, x - spread, y + 80, spread / 2);
    layoutTree(node.right || null, x + spread, y + 80, spread / 2);
  };

  const renderTree = (node: TreeNode | null) => {
    if (!node) return null;
    const getFillColor = (state: string) => state === 'active' ? '#06b6d4' : '#1e293b';
    const getStrokeColor = (state: string) => state === 'active' ? '#22d3ee' : '#475569';
    return (
      <g key={node.id}>
        {node.left && (
          <path d={`M ${node.x} ${node.y! + 24} Q ${(node.x! + node.left.x!)/2} ${node.y! + 60} ${node.left.x} ${node.left.y! - 24}`} stroke="#475569" strokeWidth="2" fill="none" />
        )}
        {node.right && (
          <path d={`M ${node.x} ${node.y! + 24} Q ${(node.x! + node.right.x!)/2} ${node.y! + 60} ${node.right.x} ${node.right.y! - 24}`} stroke="#475569" strokeWidth="2" fill="none" />
        )}
        <g transform={`translate(${node.x}, ${node.y})`}>
          <circle r="24" fill={getFillColor(node.state || 'normal')} stroke={getStrokeColor(node.state || 'normal')} strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" className="font-mono font-bold fill-white text-sm">{node.value}</text>
        </g>
        {renderTree(node.left || null)}
        {renderTree(node.right || null)}
      </g>
    );
  };

  return (
    <div className="flex h-full w-full bg-[#050810] text-slate-300">
      <div className="flex-1 relative">
        <svg className="w-full h-full">
          {renderTree(tree)}
        </svg>
      </div>
      <div className="w-80 bg-white/[0.04] backdrop-blur-xl border-l border-white/[0.08] p-4 flex flex-col gap-4">
        <h2 className="text-xl font-display text-cyan-400 font-bold">BST Operations</h2>
        <div className="flex gap-2">
          <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} className="bg-slate-800 border border-slate-600 rounded px-2 py-1 flex-1 text-white" />
          <button className="bg-cyan-500/20 text-cyan-400 border border-cyan-400/50 px-4 py-1 rounded">Insert</button>
        </div>
      </div>
    </div>
  );
};

export default BSTVisualizer;
