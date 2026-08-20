import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

export const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([45, 12, 89, 34, 67, 23, 91, 56, 78, 19]);
  const [comparingIdxs, setComparingIdxs] = useState<number[]>([]);
  const [sortedIdxs, setSortedIdxs] = useState<number[]>([]);
  const [sorting, setSorting] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Sorting Algorithms Arena: Compare Bubble Sort vs Quick Sort vs Merge Sort.');

  const runBubbleSort = async () => {
    setSorting(true);
    setSortedIdxs([]);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparingIdxs([j, j + 1]);
        setStatus(`Comparing arr[${j}] = ${arr[j]} and arr[${j + 1}] = ${arr[j + 1]}`);
        await new Promise(r => setTimeout(r, 200));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
      setSortedIdxs(prev => [...prev, n - i - 1]);
    }

    setComparingIdxs([]);
    setSortedIdxs(Array.from({ length: n }, (_, k) => k));
    setStatus('Bubble Sort Completed! Total Time Complexity: O(n²) worst case.');
    setSorting(false);
  };

  const handleReset = () => {
    setArray([45, 12, 89, 34, 67, 23, 91, 56, 78, 19]);
    setComparingIdxs([]);
    setSortedIdxs([]);
    setStatus('Reset array to unsorted state.');
  };

  return (
    <div className="bg-[#0b0f1e] border border-cyber-border rounded-xl p-6 shadow-2xl">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold font-display text-cyber-neon flex items-center gap-2">
            <span>📊</span> Sorting Algorithms Bar Visualizer
          </h3>
          <p className="text-sm text-gray-400">Step-by-step element comparisons & swaps</p>
        </div>
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <button
            onClick={runBubbleSort}
            disabled={sorting}
            className="bg-cyber-neon text-black font-semibold px-4 py-1.5 rounded-lg text-xs hover:bg-teal-300 disabled:opacity-50 flex items-center gap-1.5"
          >
            <Play size={14} /> Bubble Sort
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-700"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-6 h-64 flex items-end justify-center gap-3">
        {array.map((val, idx) => {
          const isComparing = comparingIdxs.includes(idx);
          const isSorted = sortedIdxs.includes(idx);
          return (
            <div key={idx} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[10px] font-mono text-gray-400">{val}</span>
              <motion.div
                layout
                animate={{
                  height: `${val * 2}px`,
                  backgroundColor: isComparing ? '#ffe600' : isSorted ? '#00ffe0' : '#374151'
                }}
                className={`w-full rounded-t-md transition-colors ${
                  isComparing ? 'shadow-[0_0_15px_rgba(255,230,0,0.6)]' : isSorted ? 'shadow-[0_0_15px_rgba(0,255,224,0.4)]' : ''
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-black/40 border border-gray-800 rounded-lg text-sm text-cyan-300 font-mono">
        {status}
      </div>
    </div>
  );
};
