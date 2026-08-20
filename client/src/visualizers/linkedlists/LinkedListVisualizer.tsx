import React, { useState } from 'react';
import { useAnimationEngine } from '../../engine/useAnimationEngine';
import { AnimationControls } from '../../components/ui/AnimationControls';
import { VisualState } from '../../engine/types';
import { motion } from 'framer-motion';

const getStateClass = (state?: VisualState) => {
  switch (state) {
    case 'active': return 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/30';
    case 'comparing': return 'border-yellow-400 bg-yellow-500/20 text-yellow-300';
    default: return 'border-slate-600/40 bg-slate-800/60 text-slate-300';
  }
};

export default function LinkedListVisualizer() {
  const [nodes, setNodes] = useState([{ id: 'n1', value: 10, state: 'normal' }, { id: 'n2', value: 20, state: 'normal' }]);
  const [mode, setMode] = useState<'singly' | 'doubly' | 'circular'>('singly');
  const engine = useAnimationEngine();

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-[#050810] text-slate-300 font-['Syne']">
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-6 rounded-2xl min-h-[400px] flex flex-col justify-center">
        
        <div className="flex gap-4 mb-8 justify-center">
          <button onClick={() => setMode('singly')} className={`px-4 py-2 rounded border ${mode === 'singly' ? 'border-cyan-500 bg-cyan-900/30' : 'border-slate-600'}`}>Singly</button>
          <button onClick={() => setMode('doubly')} className={`px-4 py-2 rounded border ${mode === 'doubly' ? 'border-cyan-500 bg-cyan-900/30' : 'border-slate-600'}`}>Doubly</button>
          <button onClick={() => setMode('circular')} className={`px-4 py-2 rounded border ${mode === 'circular' ? 'border-cyan-500 bg-cyan-900/30' : 'border-slate-600'}`}>Circular</button>
        </div>

        <div className="flex justify-center items-center gap-2 mb-16 overflow-x-auto p-4">
          <div className="flex flex-col items-center mr-4">
            <div className="text-cyan-400 font-bold mb-2">HEAD</div>
            <div className="w-0.5 h-8 bg-cyan-400" />
          </div>
          {nodes.map((node: any, i: number) => (
            <div key={node.id} className="flex items-center">
              <div className={`relative flex flex-col border-2 rounded-xl overflow-hidden transition-all duration-300 ${getStateClass(node.state)}`}>
                {mode === 'doubly' && (
                  <div className="px-3 py-1 text-xs text-center border-b border-white/10 text-purple-400">←prev</div>
                )}
                <div className="px-4 py-3 font-mono font-bold text-xl text-center">{node.value}</div>
                <div className="px-3 py-1 text-xs text-center border-t border-white/10 text-cyan-400">next→</div>
              </div>
              
              {/* Arrow */}
              {i < nodes.length - 1 || mode === 'circular' ? (
                <div className="flex items-center mx-1">
                  <div className="w-8 h-0.5 bg-cyan-500/60" />
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-cyan-500/60" />
                </div>
              ) : null}
            </div>
          ))}
          {mode !== 'circular' && (
            <div className="text-slate-500 font-bold ml-2">NULL</div>
          )}
        </div>

      </div>
    </div>
  );
}
