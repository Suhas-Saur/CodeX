import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Database, GitBranch, Layers, Network, Table } from 'lucide-react';
import { AlgoCard } from '../components/ui/AlgoCard';

export function DataStructuresPage() {
  const [filter, setFilter] = useState('All');
  
  const dsList = [
    { id: 'array', title: 'Arrays', type: 'Linear', color: 'cyan', icon: <Database /> },
    { id: 'linkedlist', title: 'Linked Lists', type: 'Linear', color: 'purple', icon: <GitBranch /> },
    { id: 'stack', title: 'Stack', type: 'Linear', color: 'green', icon: <Layers /> },
    { id: 'queue', title: 'Queue', type: 'Linear', color: 'yellow', icon: <Layers /> },
    { id: 'hashmap', title: 'Hash Table', type: 'Hash', color: 'orange', icon: <Table /> },
    { id: 'heap', title: 'Heap', type: 'Tree', color: 'red', icon: <Network /> },
    { id: 'bst', title: 'Binary Search Tree', type: 'Tree', color: 'cyan', icon: <GitBranch /> },
    { id: 'trie', title: 'Trie', type: 'Tree', color: 'green', icon: <GitBranch /> },
    { id: 'graph', title: 'Graph', type: 'Graph', color: 'purple', icon: <Network /> }
  ];

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-300 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-display font-bold text-white mb-4">Data Structures</h1>
          <p className="text-slate-400 text-lg">Explore the building blocks of efficient algorithms.</p>
        </header>

        <div className="flex gap-2 pb-4 overflow-x-auto">
          {['All', 'Linear', 'Tree', 'Hash', 'Graph'].map(f => (
            <button key={f} onClick={() => setFilter(f)} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filter === f ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' : 'bg-white/[0.04] text-slate-400 hover:text-white border border-transparent'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dsList.filter(d => filter === 'All' || d.type === filter).map((ds, i) => (
            <motion.div key={ds.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <AlgoCard title={ds.title} description={`Type: ${ds.type}`} path={`/ds/${ds.id}`} color={ds.color as any} icon={ds.icon} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DataStructuresPage;
