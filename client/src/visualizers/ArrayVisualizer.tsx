import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Search, Plus, Trash2 } from 'lucide-react';

export const ArrayVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([12, 24, 35, 47, 59, 68, 81, 93]);
  const [target, setTarget] = useState<number>(47);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [foundIdx, setFoundIdx] = useState<number | null>(null);
  const [searching, setSearching] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('Select an operation or run Binary Search.');
  const [inputValue, setInputValue] = useState<string>('');

  const runBinarySearch = async () => {
    setSearching(true);
    setFoundIdx(null);
    setStatusText(`Initiating Binary Search for target: ${target}`);

    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      setActiveIdx(mid);
      setStatusText(`Checking middle element at Index [${mid}] = ${array[mid]}`);

      await new Promise(r => setTimeout(r, 800));

      if (array[mid] === target) {
        setFoundIdx(mid);
        setStatusText(`Target ${target} FOUND at Index [${mid}]! Time Complexity: O(log n)`);
        setSearching(false);
        return;
      } else if (array[mid] < target) {
        setStatusText(`${array[mid]} < ${target}. Target lies in right half [${mid + 1} .. ${high}]`);
        low = mid + 1;
      } else {
        setStatusText(`${array[mid]} > ${target}. Target lies in left half [${low} .. ${mid - 1}]`);
        high = mid - 1;
      }
    }

    setStatusText(`Target ${target} NOT found in array.`);
    setActiveIdx(null);
    setSearching(false);
  };

  const handleAppend = () => {
    const val = parseInt(inputValue) || Math.floor(Math.random() * 90) + 10;
    const newArr = [...array, val].sort((a, b) => a - b);
    setArray(newArr);
    setStatusText(`Appended element ${val} and sorted array.`);
    setInputValue('');
  };

  const handleReset = () => {
    setArray([12, 24, 35, 47, 59, 68, 81, 93]);
    setActiveIdx(null);
    setFoundIdx(null);
    setStatusText('Reset array to default state.');
  };

  return (
    <div className="bg-[#0b0f1e] border border-cyber-border rounded-xl p-6 shadow-2xl">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold font-display text-cyber-neon flex items-center gap-2">
            <span>📦</span> Contiguous Array Memory Visualizer
          </h3>
          <p className="text-sm text-gray-400">Step-by-step visualization of array indexing & O(log n) Binary Search</p>
        </div>
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-20 bg-gray-900 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm text-center"
            placeholder="Target"
          />
          <button
            onClick={runBinarySearch}
            disabled={searching}
            className="bg-cyber-neon text-black font-semibold px-4 py-1.5 rounded-lg text-sm flex items-center gap-1.5 hover:bg-teal-300 disabled:opacity-50"
          >
            <Play size={16} /> Binary Search
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-700"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Array Elements Grid */}
      <div className="flex flex-wrap justify-center items-center gap-4 py-8 bg-gray-950/60 rounded-xl border border-gray-800/80 px-4">
        {array.map((val, idx) => {
          const isActive = activeIdx === idx;
          const isFound = foundIdx === idx;
          return (
            <motion.div
              key={idx}
              layout
              animate={{
                scale: isActive ? 1.15 : isFound ? 1.2 : 1,
                borderColor: isFound ? '#00ffe0' : isActive ? '#ffe600' : 'rgba(255,255,255,0.1)'
              }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col items-center justify-between w-16 h-24 rounded-xl border-2 p-2 ${
                isFound
                  ? 'bg-cyber-neon/20 border-cyber-neon shadow-[0_0_20px_rgba(0,255,224,0.4)]'
                  : isActive
                  ? 'bg-yellow-500/20 border-yellow-400'
                  : 'bg-gray-900/90 border-gray-700'
              }`}
            >
              <span className="text-xs text-gray-400 font-mono">[{idx}]</span>
              <span className="text-lg font-bold font-mono text-white">{val}</span>
              <span className="text-[10px] text-gray-500 font-mono">0x{1000 + idx * 4}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Status Output */}
      <div className="mt-4 p-3 bg-black/40 border border-gray-800 rounded-lg text-sm text-cyan-300 font-mono flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyber-neon animate-ping"></span>
        {statusText}
      </div>
    </div>
  );
};
