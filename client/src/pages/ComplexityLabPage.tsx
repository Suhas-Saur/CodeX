import React, { useState } from 'react';
import { BigOChart } from '../components/charts/BigOChart';

export function ComplexityLabPage() {
  const [n, setN] = useState(10);

  const complexities = [
    { name: 'O(1)', calc: () => 1, color: 'text-emerald-400' },
    { name: 'O(log n)', calc: (n: number) => Math.log2(n).toFixed(2), color: 'text-green-400' },
    { name: 'O(n)', calc: (n: number) => n, color: 'text-yellow-400' },
    { name: 'O(n log n)', calc: (n: number) => (n * Math.log2(n)).toFixed(2), color: 'text-orange-400' },
    { name: 'O(n²)', calc: (n: number) => n * n, color: 'text-red-400' },
    { name: 'O(2^n)', calc: (n: number) => Math.pow(2, n).toLocaleString(), color: 'text-pink-500' }
  ];

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-300 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Complexity Lab</h1>
          <p className="text-slate-400">Understand Big-O notation through interactive visualization.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/[0.02] border border-white/[0.08] p-6 rounded-2xl backdrop-blur-xl flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6">Growth Graph</h2>
            <div className="flex-1 min-h-[300px]">
              <BigOChart />
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Input Size (n): <strong className="text-cyan-400">{n}</strong></span>
                <span>Max: 100</span>
              </div>
              <input type="range" min="1" max="100" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-cyan-500" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-6">Operations Count at n={n}</h2>
            <div className="grid gap-3">
              {complexities.map(c => (
                <div key={c.name} className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                  <span className={`font-mono font-bold ${c.color}`}>{c.name}</span>
                  <span className="font-mono text-slate-300 text-lg">{c.calc(n)} ops</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-xl">
          <div className="p-6 border-b border-white/[0.08]">
            <h2 className="text-xl font-bold text-white">Algorithm Complexity Cheat Sheet</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/40 text-slate-400">
                <tr>
                  <th className="p-4">Algorithm</th>
                  <th className="p-4">Time (Best)</th>
                  <th className="p-4">Time (Avg)</th>
                  <th className="p-4">Time (Worst)</th>
                  <th className="p-4">Space</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {[
                  ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
                  ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)'],
                  ['Binary Search', 'O(1)', 'O(log n)', 'O(log n)', 'O(1)']
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-medium text-white">{row[0]}</td>
                    <td className="p-4 font-mono text-emerald-400">{row[1]}</td>
                    <td className="p-4 font-mono text-yellow-400">{row[2]}</td>
                    <td className="p-4 font-mono text-red-400">{row[3]}</td>
                    <td className="p-4 font-mono text-cyan-400">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ComplexityLabPage;
