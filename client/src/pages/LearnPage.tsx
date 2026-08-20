import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle, Circle, Lock, Search } from 'lucide-react';
import { useProgress } from '../engine/useProgress';

const PATH_DATA = [
  { id: 'arrays-101', title: 'Arrays 101', level: 'Beginner', time: '45 min', type: 'ds', completed: true },
  { id: 'linked-lists', title: 'Linked Lists', level: 'Beginner', time: '1 hr', type: 'ds', completed: false },
  { id: 'sorting-basics', title: 'Basic Sorting', level: 'Beginner', time: '1.5 hr', type: 'algo', completed: false },
  { id: 'trees-intro', title: 'Trees & BST', level: 'Intermediate', time: '2 hr', type: 'ds', completed: false },
  { id: 'graph-basics', title: 'Graph Traversal', level: 'Intermediate', time: '2 hr', type: 'graph', completed: false },
  { id: 'dp-intro', title: 'Intro to DP', level: 'Advanced', time: '3 hr', type: 'dp', completed: false },
];

export function LearnPage() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = PATH_DATA.filter(item => 
    (filter === 'All' || item.type === filter.toLowerCase() || (filter === 'Data Structures' && item.type === 'ds') || (filter === 'Algorithms' && item.type === 'algo')) &&
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-300 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-display font-bold text-white mb-4">Learning Path</h1>
          <p className="text-slate-400 text-lg">Follow a structured curriculum from beginner to advanced.</p>
        </header>

        <div className="flex flex-wrap gap-4 items-center justify-between bg-white/[0.04] border border-white/[0.08] p-4 rounded-xl backdrop-blur-md">
          <div className="flex gap-2">
            {['All', 'Data Structures', 'Algorithms', 'Graph', 'DP'].map(f => (
              <button key={f} onClick={() => setFilter(f)} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' : 'bg-white/[0.04] text-slate-400 hover:text-white border border-transparent'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            <input type="text" placeholder="Search topics..." value={search} onChange={e => setSearch(e.target.value)}
              className="bg-black/50 border border-white/[0.08] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400/50" />
          </div>
        </div>

        <div className="space-y-6">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-6 p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl hover:border-cyan-400/30 transition-all">
              <div className="flex-shrink-0">
                {item.completed ? <CheckCircle className="text-emerald-400" size={32} /> : <Circle className="text-slate-600" size={32} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded border ${item.level === 'Beginner' ? 'bg-green-500/10 border-green-500/30 text-green-400' : item.level === 'Intermediate' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                    {item.level}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{item.time} • Type: {item.type.toUpperCase()}</p>
              </div>
              <button onClick={() => navigate(`/topic/${item.id}`)} className="px-6 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 hover:bg-cyan-500/30 transition-all flex items-center gap-2">
                <Play size={16} /> Start
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default LearnPage;
