import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Database, Code2, Network, BarChart2, X } from 'lucide-react';

const COMMANDS = [
  { label: 'Home', path: '/', group: 'Pages' },
  { label: 'Learn', path: '/learn', group: 'Pages' },
  { label: 'Graph Lab', path: '/graph-lab', group: 'Labs' },
  { label: 'Sorting Lab', path: '/sorting-lab', group: 'Labs' },
  { label: 'Complexity Lab', path: '/complexity-lab', group: 'Labs' },
  { label: 'Quiz Arena', path: '/quiz', group: 'Practice' },
  { label: 'Practice Mode', path: '/practice', group: 'Practice' },
  { label: 'Progress', path: '/progress', group: 'Pages' },
  { label: 'Cheat Sheets', path: '/cheat-sheets', group: 'Reference' },
  { label: 'Arrays', path: '/ds/array', group: 'Data Structures' },
  { label: 'Linked Lists', path: '/ds/linkedlist', group: 'Data Structures' },
  { label: 'Stack', path: '/ds/stack', group: 'Data Structures' },
  { label: 'Queue', path: '/ds/queue', group: 'Data Structures' },
  { label: 'Hash Table', path: '/ds/hashmap', group: 'Data Structures' },
  { label: 'Heap', path: '/ds/heap', group: 'Data Structures' },
  { label: 'Trie', path: '/ds/trie', group: 'Data Structures' },
  { label: 'Binary Search Tree', path: '/trees/bst', group: 'Trees' },
  { label: 'AVL Tree', path: '/trees/avl', group: 'Trees' },
  { label: 'Tree Traversals', path: '/trees/traversals', group: 'Trees' },
  { label: 'Bubble Sort', path: '/sorting-lab', group: 'Sorting' },
  { label: 'Merge Sort', path: '/sorting-lab', group: 'Sorting' },
  { label: 'Quick Sort', path: '/sorting-lab', group: 'Sorting' },
  { label: 'Binary Search', path: '/algo/searching', group: 'Searching' },
  { label: 'Dynamic Programming', path: '/algo/dp', group: 'Algorithms' },
  { label: 'Backtracking', path: '/algo/backtracking', group: 'Algorithms' },
  { label: 'BFS / DFS', path: '/graph-lab', group: 'Graph Algorithms' },
  { label: "Dijkstra's", path: '/graph-lab', group: 'Graph Algorithms' },
  { label: "Kruskal's MST", path: '/graph-lab', group: 'Graph Algorithms' },
  { label: 'KMP String Matching', path: '/algo/strings', group: 'Strings' },
  { label: 'Big-O Complexity', path: '/complexity-lab', group: 'Reference' },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === 'Enter') {
        if (filtered[selected]) { navigate(filtered[selected].path); onClose(); }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, filtered, selected, navigate, onClose]);

  if (!isOpen) return null;

  const groups = [...new Set(filtered.map(c => c.group))];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-[#0a0f1e] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08]">
          <Search size={18} className="text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Search algorithms, data structures, pages..."
            className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 text-sm outline-none"
          />
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-500 text-sm">No results found</div>
          ) : (
            groups.map(group => (
              <div key={group}>
                <div className="px-4 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{group}</div>
                {filtered.filter(c => c.group === group).map((cmd, idx) => {
                  const globalIdx = filtered.indexOf(cmd);
                  return (
                    <button
                      key={cmd.path + cmd.label}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all
                        ${selected === globalIdx ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-300 hover:bg-white/[0.04]'}`}
                      onClick={() => { navigate(cmd.path); onClose(); }}
                      onMouseEnter={() => setSelected(globalIdx)}
                    >
                      <ArrowRight size={14} className={selected === globalIdx ? 'text-cyan-400' : 'text-slate-600'} />
                      <span className="text-sm">{cmd.label}</span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-white/[0.06] flex items-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-white/[0.08] font-mono">↑↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-white/[0.08] font-mono">↵</kbd> select</span>
          <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-white/[0.08] font-mono">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
