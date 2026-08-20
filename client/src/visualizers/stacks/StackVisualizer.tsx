import React, { useState } from 'react';
import { useAnimationEngine } from '../../engine/useAnimationEngine';
import { VisualState } from '../../engine/types';
import { motion, AnimatePresence } from 'framer-motion';

const getStateClass = (state?: VisualState) => {
  return state === 'active' ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/30' : 'border-slate-600/40 bg-slate-800/60 text-slate-300';
};

export default function StackVisualizer() {
  const [stack, setStack] = useState([{ id: 's1', value: 10, state: 'normal' }, { id: 's2', value: 20, state: 'normal' }]);

  const handlePush = () => {
    setStack([...stack, { id: `s${Date.now()}`, value: Math.floor(Math.random() * 100), state: 'active' }]);
  };

  const handlePop = () => {
    if (stack.length > 0) setStack(stack.slice(0, -1));
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-[#050810] text-slate-300 font-['Syne']">
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-6 rounded-2xl min-h-[500px] flex flex-col justify-center items-center">
        
        <div className="flex gap-4 mb-12">
          <button onClick={handlePush} className="bg-slate-800 border border-slate-600 px-4 py-2 rounded">Push</button>
          <button onClick={handlePop} className="bg-slate-800 border border-slate-600 px-4 py-2 rounded">Pop</button>
        </div>

        <div className="flex flex-col-reverse gap-2 items-center">
          <AnimatePresence>
            {stack.map((el, i) => (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`w-40 h-14 rounded-xl border-2 flex items-center justify-between px-4
                  font-mono font-bold text-xl ${getStateClass(el.state as VisualState)}`}
              >
                <span className="text-xs text-slate-500">idx={i}</span>
                <span>{el.value}</span>
                {i === stack.length - 1 && <span className="text-xs text-cyan-400">← TOP</span>}
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="w-48 h-1 bg-slate-600/40 rounded mt-2" />
          <div className="text-xs text-slate-500 mt-1">BOTTOM</div>
        </div>

      </div>
    </div>
  );
}
