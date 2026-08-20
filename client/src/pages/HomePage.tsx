import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Play, BookOpen, BarChart2, Activity, Database, GitBranch, Search, Zap } from 'lucide-react';
import { AlgoCard } from '../components/ui/AlgoCard';
import { BigOChart } from '../components/charts/BigOChart';

function HeroAnimation() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-full">
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,212,255,0.05)" strokeWidth="1"/>
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#grid)" />
      
      {[ [100, 100], [200, 80], [300, 120], [150, 200], [250, 180], [320, 220] ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="20" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.6)" strokeWidth="1.5" filter="url(#glow)">
            <animate attributeName="r" values="18;22;18" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text x={cx} y={cy + 5} textAnchor="middle" fill="rgba(0,212,255,0.9)" fontSize="12" fontFamily="monospace">{String.fromCharCode(65 + i)}</text>
        </g>
      ))}
      
      {[ [100,100,200,80], [200,80,300,120], [100,100,150,200], [200,80,250,180], [300,120,250,180], [150,200,250,180] ].map(([x1,y1,x2,y2], i) => (
        <line key={`edge-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,212,255,0.25)" strokeWidth="1.5" strokeDasharray="5,3">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
        </line>
      ))}
      
      {[ [480, 80], [440, 140], [520, 140], [420, 200], [460, 200], [500, 200], [540, 200] ].map(([cx, cy], i) => (
        <g key={`tree-${i}`}>
          <circle cx={cx} cy={cy} r="18" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.6)" strokeWidth="1.5" filter="url(#glow)">
            <animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
          </circle>
          <text x={cx} y={cy + 5} textAnchor="middle" fill="rgba(124,58,237,0.9)" fontSize="11" fontFamily="monospace">{[50,30,70,15,40,60,80][i]}</text>
        </g>
      ))}
      {[ [480,80,440,140],[480,80,520,140],[440,140,420,200],[440,140,460,200],[520,140,500,200],[520,140,540,200] ].map(([x1,y1,x2,y2],i) => (
        <line key={`tedge-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" />
      ))}
      
      {[12, 45, 8, 67, 23, 91, 34, 56].map((v, i) => (
        <g key={`arr-${i}`}>
          <rect x={60 + i * 60} y={310} width={50} height={50} rx="8" fill="rgba(0,255,159,0.05)" stroke="rgba(0,255,159,0.3)" strokeWidth="1.5" />
          <text x={85 + i * 60} y={340} textAnchor="middle" fill="rgba(0,255,159,0.8)" fontSize="14" fontFamily="monospace" fontWeight="bold">{v}</text>
          <text x={85 + i * 60} y={375} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="monospace">[{i}]</text>
        </g>
      ))}
      
      <rect x="60" y="310" width="50" height="50" rx="8" fill="none" stroke="rgba(0,212,255,0.8)" strokeWidth="2" opacity="0">
        <animate attributeName="x" values="60;480;60" dur="6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;1;0" dur="6s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-300 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-6xl font-['Syne'] font-bold leading-tight text-white">
              Master DSA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Visually
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg">
              See every operation, comparison, traversal, pointer movement, and decision happen step by step.
            </p>
            <div className="flex gap-4 pt-4">
              <button onClick={() => navigate('/learn')} className="px-6 py-3 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 hover:bg-cyan-500/30 transition-all font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/20">
                <BookOpen size={20} /> Start Learning
              </button>
              <button onClick={() => navigate('/visualizer')} className="px-6 py-3 rounded-lg bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08] transition-all font-semibold flex items-center gap-2 backdrop-blur-xl">
                <Play size={20} /> Open Visualizer
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="flex-1 h-[400px] w-full rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl p-4 overflow-hidden relative"
          >
            <HeroAnimation />
          </motion.div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { label: "Data Structures", value: "25+" },
            { label: "Algorithms", value: "50+" },
            { label: "Students", value: "10,000+" },
            { label: "Quiz Questions", value: "200+" }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center backdrop-blur-xl">
              <div className="text-3xl font-display font-bold text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </section>

        {/* Explore Data Structures */}
        <section className="mb-24">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Explore Data Structures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AlgoCard title="Arrays" description="Linear collection of elements." path="/ds/array" color="cyan" icon={<Database size={24}/>} />
            <AlgoCard title="Linked Lists" description="Nodes connected by pointers." path="/ds/linkedlist" color="purple" icon={<GitBranch size={24}/>} />
            <AlgoCard title="Stack" description="LIFO data structure." path="/ds/stack" color="green" icon={<Database size={24}/>} />
            <AlgoCard title="Queue" description="FIFO data structure." path="/ds/queue" color="yellow" icon={<Database size={24}/>} />
            <AlgoCard title="Hash Table" description="Key-value pair mapping." path="/ds/hashmap" color="orange" icon={<Database size={24}/>} />
            <AlgoCard title="Heap" description="Tree-based priority queue." path="/ds/heap" color="red" icon={<Activity size={24}/>} />
            <AlgoCard title="Trees" description="Hierarchical structures." path="/trees/bst" color="cyan" icon={<GitBranch size={24}/>} />
            <AlgoCard title="Graphs" description="Vertices connected by edges." path="/graph-lab" color="purple" icon={<Activity size={24}/>} />
            <AlgoCard title="Trie" description="Prefix tree for strings." path="/ds/trie" color="green" icon={<GitBranch size={24}/>} />
          </div>
        </section>

        {/* Quick Access Labs */}
        <section className="mb-24">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Interactive Labs & Arena</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => navigate('/graph-lab')} className="cursor-pointer group p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-400/50 transition-all backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><GitBranch size={100} className="text-purple-400"/></div>
              <h3 className="text-2xl font-bold text-purple-400 mb-2">Graph Lab</h3>
              <p className="text-slate-400">Build, traverse, and run algorithms on custom graphs interactively.</p>
            </div>
            <div onClick={() => navigate('/sorting-lab')} className="cursor-pointer group p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-400/50 transition-all backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><BarChart2 size={100} className="text-cyan-400"/></div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">Sorting Lab</h3>
              <p className="text-slate-400">Compare sorting algorithms side by side with real-time metrics.</p>
            </div>
            <div onClick={() => navigate('/quiz')} className="cursor-pointer group p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-emerald-400/50 transition-all backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Zap size={100} className="text-emerald-400"/></div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">Quiz Arena</h3>
              <p className="text-slate-400">Test your knowledge with gamified quizzes and timed challenges.</p>
            </div>
          </div>
        </section>

        {/* Complexity Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Master Complexity Analysis</h2>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl h-[400px]">
            <BigOChart />
          </div>
        </section>

      </div>
    </div>
  );
}
export default HomePage;
