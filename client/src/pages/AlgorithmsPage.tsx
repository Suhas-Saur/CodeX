import React from 'react';
import { motion } from 'framer-motion';
import { AlgoCard } from '../components/ui/AlgoCard';
import { BarChart2, Search, Network, ArrowRight } from 'lucide-react';

export function AlgorithmsPage() {
  const categories = [
    { title: 'Sorting', icon: <BarChart2 />, color: 'cyan', items: ['Bubble', 'Merge', 'Quick', 'Heap', 'Insertion'] },
    { title: 'Searching', icon: <Search />, color: 'purple', items: ['Linear', 'Binary', 'DFS', 'BFS'] },
    { title: 'Graph', icon: <Network />, color: 'green', items: ['Dijkstra', 'Kruskal', 'Prim', 'Bellman-Ford'] },
    { title: 'Dynamic Programming', icon: <ArrowRight />, color: 'yellow', items: ['Knapsack', 'LCS', 'Fibonacci'] },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-300 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-display font-bold text-white mb-4">Algorithms</h1>
          <p className="text-slate-400 text-lg">Master computational procedures and problem-solving techniques.</p>
        </header>

        <div className="space-y-12">
          {categories.map((cat, i) => (
            <section key={cat.title}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-${cat.color}-500/20 text-${cat.color}-400`}>{cat.icon}</div>
                <h2 className="text-2xl font-bold text-white">{cat.title}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cat.items.map((algo, j) => (
                  <motion.div key={algo} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.05 }}>
                    <AlgoCard title={algo} description="" path={`/algo/${algo.toLowerCase()}`} color={cat.color as any} icon={cat.icon} />
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AlgorithmsPage;
