import React, { useState } from 'react';
import { Search, Printer, ChevronDown, ChevronUp } from 'lucide-react';

const CHEAT_SHEET_DATA = [
  { id: 'array', title: 'Arrays', cat: 'Data Structure', best: 'O(1)', avg: 'O(1)', worst: 'O(n)', space: 'O(n)', code: 'const arr = [];' },
  { id: 'quicksort', title: 'Quick Sort', cat: 'Algorithm', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', code: 'function quickSort(arr) { ... }' }
];

export function CheatSheetsPage() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = CHEAT_SHEET_DATA.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-300 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-end border-b border-white/[0.08] pb-6">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">Cheat Sheets</h1>
            <p className="text-slate-400">Quick reference for complexities, concepts, and code snippets.</p>
          </div>
          <button className="p-2 bg-white/[0.05] rounded hover:bg-white/[0.1]"><Printer size={20}/></button>
        </header>

        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
          <input type="text" placeholder="Search structures or algorithms..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/[0.1] rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400/50" />
        </div>

        <div className="space-y-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-white/[0.02] border border-white/[0.08] rounded-xl overflow-hidden">
              <div className="p-6 cursor-pointer flex justify-between items-center hover:bg-white/[0.02]" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-white">{item.title}</h2>
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{item.cat}</span>
                  </div>
                </div>
                {expanded === item.id ? <ChevronUp /> : <ChevronDown />}
              </div>
              
              {expanded === item.id && (
                <div className="p-6 border-t border-white/[0.08] bg-black/20">
                  <table className="w-full text-left text-sm mb-6">
                    <thead className="text-slate-500"><tr><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr></thead>
                    <tbody className="font-mono text-lg">
                      <tr>
                        <td className="text-emerald-400">{item.best}</td>
                        <td className="text-yellow-400">{item.avg}</td>
                        <td className="text-red-400">{item.worst}</td>
                        <td className="text-cyan-400">{item.space}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="bg-[#0a0a0a] border border-white/[0.1] rounded p-4 font-mono text-sm text-cyan-300">
                    <pre>{item.code}</pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CheatSheetsPage;
