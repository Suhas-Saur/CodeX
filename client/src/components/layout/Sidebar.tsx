import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, BookOpen, Play, Database, GitBranch, BarChart2,
  Layers, FlaskConical, Target, Trophy, TrendingUp, BookMarked,
  ChevronLeft, ChevronRight, Code2, Network, Search, Zap,
  Shuffle, Binary, ChevronDown
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/visualizer', label: 'Visualizer', icon: Play },
  {
    label: 'Data Structures',
    icon: Database,
    path: '/data-structures',
    children: [
      { path: '/ds/array', label: 'Arrays' },
      { path: '/ds/linkedlist', label: 'Linked Lists' },
      { path: '/ds/stack', label: 'Stack' },
      { path: '/ds/queue', label: 'Queue' },
      { path: '/ds/hashmap', label: 'Hash Table' },
      { path: '/ds/heap', label: 'Heap' },
      { path: '/ds/trie', label: 'Trie' },
    ]
  },
  {
    label: 'Algorithms',
    icon: Code2,
    path: '/algorithms',
    children: [
      { path: '/algo/sorting', label: 'Sorting' },
      { path: '/algo/searching', label: 'Searching' },
      { path: '/algo/recursion', label: 'Recursion' },
      { path: '/algo/dp', label: 'Dynamic Programming' },
      { path: '/algo/backtracking', label: 'Backtracking' },
      { path: '/algo/strings', label: 'String Algorithms' },
      { path: '/algo/greedy', label: 'Greedy' },
    ]
  },
  {
    label: 'Tree Lab',
    icon: Binary,
    path: '/trees',
    children: [
      { path: '/trees/bst', label: 'Binary Search Tree' },
      { path: '/trees/avl', label: 'AVL Tree' },
      { path: '/trees/traversals', label: 'Tree Traversals' },
    ]
  },
  { path: '/graph-lab', label: 'Graph Lab', icon: Network },
  { path: '/sorting-lab', label: 'Sorting Lab', icon: Shuffle },
  { path: '/complexity-lab', label: 'Complexity Lab', icon: TrendingUp },
  { path: '/practice', label: 'Practice', icon: Target },
  { path: '/quiz', label: 'Quiz Arena', icon: Trophy, badge: 'NEW' },
  { path: '/progress', label: 'Progress', icon: BarChart2 },
  { path: '/cheat-sheets', label: 'Cheat Sheets', icon: BookMarked },
];

function NavItemComp({ item, isOpen, depth = 0 }: { item: any; isOpen: boolean; depth?: number }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const isActive = location.pathname === item.path;
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  if (hasChildren) {
    const isAnyChildActive = item.children.some((c: any) => location.pathname === c.path);
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
            ${ isAnyChildActive ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'}`}
        >
          {Icon && <Icon size={18} className={`flex-shrink-0 ${isAnyChildActive ? 'text-cyan-400' : 'group-hover:text-cyan-400 transition-colors'}`} />}
          {isOpen && (
            <>
              <span className="flex-1 text-sm font-medium text-left truncate">{item.label}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>
        {isOpen && expanded && (
          <div className="ml-4 mt-1 space-y-0.5 border-l border-white/[0.06] pl-3">
            {item.children.map((child: any) => (
              <Link
                key={child.path}
                to={child.path}
                className={`block px-3 py-1.5 rounded-lg text-xs transition-all duration-200
                  ${location.pathname === child.path
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]'}`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path || '#'}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
        ${isActive
          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20'
          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'}`}
    >
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-cyan-400 rounded-full" />}
      {Icon && <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400 transition-colors'}`} />}
      {isOpen && (
        <>
          <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
          {item.badge && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <div className={`relative flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out z-20
      ${isOpen ? 'w-64' : 'w-16'}
      bg-[#080d1a]/80 backdrop-blur-xl border-r border-white/[0.06]`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]">
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/30 flex items-center justify-center">
            <Zap size={18} className="text-cyan-400" />
          </div>
          <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-lg" />
        </div>
        {isOpen && (
          <div>
            <div className="font-display font-bold text-white text-lg leading-none">AlgoForge</div>
            <div className="text-[10px] text-slate-500 mt-0.5">See the logic.</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        {NAV_ITEMS.map((item, i) => (
          <NavItemComp key={i} item={item} isOpen={isOpen} />
        ))}
      </nav>

      {/* Toggle button */}
      <div className="p-3 border-t border-white/[0.06]">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.06] transition-all duration-200"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          {isOpen && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </div>
  );
}
