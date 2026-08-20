import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';

export const StackQueueVisualizer: React.FC = () => {
  const [stack, setStack] = useState<number[]>([15, 30, 45, 60]);
  const [queue, setQueue] = useState<number[]>([100, 200, 300, 400]);
  const [val, setVal] = useState<string>('');
  const [status, setStatus] = useState<string>('Stack operates on LIFO (Last In First Out); Queue operates on FIFO (First In First Out).');

  const pushStack = () => {
    const num = parseInt(val) || Math.floor(Math.random() * 90) + 10;
    setStack([...stack, num]);
    setStatus(`PUSHED ${num} to Top of Stack. Time: O(1)`);
    setVal('');
  };

  const popStack = () => {
    if (stack.length === 0) return;
    const removed = stack[stack.length - 1];
    setStack(stack.slice(0, stack.length - 1));
    setStatus(`POPPED ${removed} from Top of Stack. Time: O(1)`);
  };

  const enqueue = () => {
    const num = parseInt(val) || Math.floor(Math.random() * 90) + 10;
    setQueue([...queue, num]);
    setStatus(`ENQUEUED ${num} to REAR of Queue. Time: O(1)`);
    setVal('');
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    const removed = queue[0];
    setQueue(queue.slice(1));
    setStatus(`DEQUEUED ${removed} from FRONT of Queue. Time: O(1)`);
  };

  return (
    <div className="bg-[#0b0f1e] border border-cyber-border rounded-xl p-6 shadow-2xl">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold font-display text-cyber-yellow flex items-center gap-2">
            <span>🥞</span> Stack (LIFO) & Queue (FIFO) Visualizer
          </h3>
          <p className="text-sm text-gray-400">Push/Pop for Stack and Enqueue/Dequeue for Queue</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-20 bg-gray-900 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm"
            placeholder="Val"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* STACK CONTAINER */}
        <div className="bg-gray-950/80 border border-yellow-500/30 rounded-xl p-5 flex flex-col items-center">
          <div className="flex justify-between items-center w-full mb-4">
            <span className="font-bold text-yellow-400 font-display">STACK (LIFO)</span>
            <div className="flex gap-2">
              <button onClick={pushStack} className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded hover:bg-yellow-400">PUSH</button>
              <button onClick={popStack} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded hover:bg-gray-700">POP</button>
            </div>
          </div>

          <div className="w-full max-w-[200px] h-64 border-b-4 border-l-4 border-r-4 border-yellow-500/50 rounded-b-xl flex flex-col-reverse items-center justify-start p-2 gap-2 overflow-y-auto bg-black/40">
            <AnimatePresence>
              {stack.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  className={`w-full py-2.5 rounded-lg text-center font-mono font-bold border text-sm ${
                    idx === stack.length - 1
                      ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_12px_rgba(255,230,0,0.3)]'
                      : 'bg-gray-900 border-gray-700 text-white'
                  }`}
                >
                  {item} {idx === stack.length - 1 && <span className="text-[10px] text-yellow-400 ml-1">(TOP)</span>}
                </motion.div>
              ))}
            </AnimatePresence>
            {stack.length === 0 && <span className="text-xs text-gray-500 my-auto">STACK EMPTY</span>}
          </div>
        </div>

        {/* QUEUE CONTAINER */}
        <div className="bg-gray-950/80 border border-cyan-500/30 rounded-xl p-5 flex flex-col items-center">
          <div className="flex justify-between items-center w-full mb-4">
            <span className="font-bold text-cyan-400 font-display">QUEUE (FIFO)</span>
            <div className="flex gap-2">
              <button onClick={enqueue} className="bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded hover:bg-cyan-400">ENQUEUE</button>
              <button onClick={dequeue} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded hover:bg-gray-700">DEQUEUE</button>
            </div>
          </div>

          <div className="w-full h-64 border-t-2 border-b-2 border-cyan-500/50 rounded-xl flex items-center justify-start p-3 gap-2 overflow-x-auto bg-black/40">
            <AnimatePresence>
              {queue.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  className={`min-w-[65px] h-20 rounded-lg flex flex-col items-center justify-center font-mono font-bold border text-sm ${
                    idx === 0
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,255,224,0.3)]'
                      : 'bg-gray-900 border-gray-700 text-white'
                  }`}
                >
                  <span>{item}</span>
                  <span className="text-[9px] text-gray-400">
                    {idx === 0 ? 'FRONT' : idx === queue.length - 1 ? 'REAR' : `[${idx}]`}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {queue.length === 0 && <span className="text-xs text-gray-500 mx-auto">QUEUE EMPTY</span>}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-black/40 border border-gray-800 rounded-lg text-sm text-yellow-200 font-mono">
        {status}
      </div>
    </div>
  );
};
