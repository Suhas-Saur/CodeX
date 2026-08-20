import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QueueVisualizer() {
  const [queue, setQueue] = useState([{ id: 'q1', value: 10 }, { id: 'q2', value: 20 }]);

  const handleEnqueue = () => {
    setQueue([...queue, { id: `q${Date.now()}`, value: Math.floor(Math.random() * 100) }]);
  };

  const handleDequeue = () => {
    if (queue.length > 0) setQueue(queue.slice(1));
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-[#050810] text-slate-300 font-['Syne']">
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-6 rounded-2xl min-h-[400px] flex flex-col items-center justify-center">
        
        <div className="flex gap-4 mb-12">
          <button onClick={handleEnqueue} className="bg-slate-800 border border-slate-600 px-4 py-2 rounded">Enqueue</button>
          <button onClick={handleDequeue} className="bg-slate-800 border border-slate-600 px-4 py-2 rounded">Dequeue</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-cyan-400 font-bold">FRONT</div>
          <div className="flex border-t-2 border-b-2 border-slate-600/40 p-4 gap-2 min-w-[300px] min-h-[80px]">
            <AnimatePresence>
              {queue.map((el, i) => (
                <motion.div
                  key={el.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center
                    font-mono font-bold text-xl border-cyan-400/50 bg-cyan-900/20 text-cyan-300 shadow-lg`}
                >
                  {el.value}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="text-purple-400 font-bold">REAR</div>
        </div>

      </div>
    </div>
  );
}
