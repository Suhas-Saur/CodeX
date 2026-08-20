import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search, Command, Zap } from 'lucide-react';

const BREADCRUMBS: Record<string, string> = {
  '/': 'Home',
  '/learn': 'Learn',
  '/visualizer': 'Visualizer',
  '/data-structures': 'Data Structures',
  '/algorithms': 'Algorithms',
  '/graph-lab': 'Graph Lab',
  '/sorting-lab': 'Sorting Lab',
  '/complexity-lab': 'Complexity Lab',
  '/practice': 'Practice',
  '/quiz': 'Quiz Arena',
  '/progress': 'Progress',
  '/cheat-sheets': 'Cheat Sheets',
  '/trees': 'Tree Lab',
  '/trees/bst': 'BST',
  '/trees/avl': 'AVL Tree',
  '/ds/array': 'Arrays',
  '/ds/linkedlist': 'Linked Lists',
  '/ds/stack': 'Stack',
  '/ds/queue': 'Queue',
  '/ds/hashmap': 'Hash Table',
  '/ds/heap': 'Heap',
  '/ds/trie': 'Trie',
  '/algo/sorting': 'Sorting',
  '/algo/searching': 'Searching',
  '/algo/recursion': 'Recursion',
  '/algo/dp': 'Dynamic Programming',
  '/algo/backtracking': 'Backtracking',
  '/algo/strings': 'String Algorithms',
};

interface TopBarProps {
  onMenuToggle: () => void;
  onSearchClick: () => void;
}

export function TopBar({ onMenuToggle, onSearchClick }: TopBarProps) {
  const location = useLocation();
  const pageName = BREADCRUMBS[location.pathname] || 'AlgoForge';

  return (
    <div className="flex items-center gap-4 px-4 h-14 bg-[#080d1a]/60 backdrop-blur-xl border-b border-white/[0.06] flex-shrink-0 z-10">
      <button
        onClick={onMenuToggle}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition-all"
      >
        <Menu size={18} />
      </button>
      <div className="flex items-center gap-2 text-sm">
        <Zap size={14} className="text-cyan-400" />
        <span className="text-slate-500">AlgoForge</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-200 font-medium">{pageName}</span>
      </div>
      <div className="flex-1" />
      <button
        onClick={onSearchClick}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] transition-all group text-sm"
      >
        <Search size={14} />
        <span className="hidden sm:block">Search DSA...</span>
        <div className="hidden sm:flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06] text-xs">
          <Command size={10} />
          <span>K</span>
        </div>
      </button>
    </div>
  );
}
