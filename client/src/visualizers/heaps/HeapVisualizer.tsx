import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeapVisualizer() {
  const [heap, setHeap] = useState([100, 50, 40, 20, 10, 30]);
  const [isMinHeap, setIsMinHeap] = useState(false);

  function getNodePosition(index: number, total: number, width: number, height: number) {
    if (index === 0) return { x: width / 2, y: 60 };
    const level = Math.floor(Math.log2(index + 1));
    const levelWidth = Math.pow(2, level);
    const posInLevel = index - (Math.pow(2, level) - 1);
    const x = (width / (levelWidth + 1)) * (posInLevel + 1);
    const y = 60 + level * 80;
    return { x, y };
  }

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-[#050810] text-slate-300 font-['Syne']">
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-6 rounded-2xl min-h-[500px] flex flex-col">
        
        <div className="flex gap-4 mb-4 justify-between">
          <div className="flex gap-2">
             <button className="bg-slate-800 border border-slate-600 px-4 py-2 rounded">Insert</button>
             <button className="bg-slate-800 border border-slate-600 px-4 py-2 rounded">Extract {isMinHeap ? 'Min' : 'Max'}</button>
          </div>
          <button 
             onClick={() => setIsMinHeap(!isMinHeap)}
             className="bg-slate-800 border border-slate-600 px-4 py-2 rounded"
          >
             Toggle {isMinHeap ? 'Min' : 'Max'} Heap
          </button>
        </div>

        <div className="relative flex-1 min-h-[300px]">
          <svg className="absolute inset-0 w-full h-full">
            {heap.map((_, i) => {
              if (i === 0) return null;
              const parentIdx = Math.floor((i - 1) / 2);
              const parentPos = getNodePosition(parentIdx, heap.length, 800, 300);
              const currPos = getNodePosition(i, heap.length, 800, 300);
              return (
                <line 
                  key={`line-${i}`}
                  x1={parentPos.x} y1={parentPos.y} 
                  x2={currPos.x} y2={currPos.y}
                  stroke="#475569" strokeWidth="2"
                />
              )
            })}
          </svg>
          {heap.map((val, i) => {
            const pos = getNodePosition(i, heap.length, 800, 300);
            return (
              <motion.div
                key={`node-${i}`}
                style={{ left: pos.x - 24, top: pos.y - 24, position: 'absolute' }}
                className="w-12 h-12 rounded-full border-2 border-cyan-500/50 bg-cyan-900/30 flex items-center justify-center font-mono text-cyan-100 shadow-lg shadow-cyan-500/20"
              >
                {val}
              </motion.div>
            )
          })}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {heap.map((val, i) => (
            <div key={`arr-${i}`} className="flex flex-col items-center">
              <div className="w-12 h-12 border-2 border-slate-600 bg-slate-800 flex items-center justify-center rounded font-mono">{val}</div>
              <div className="text-xs text-slate-500 mt-1">{i}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
