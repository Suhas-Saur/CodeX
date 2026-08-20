import React, { useState } from 'react';
import { TreeNode } from '../../engine/types';

export const AVLVisualizer: React.FC = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  
  return (
    <div className="flex h-full w-full bg-[#050810] text-slate-300">
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xl font-display text-cyan-400">AVL Visualizer Coming Soon</p>
      </div>
    </div>
  );
};

export default AVLVisualizer;
