import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TrieVisualizer() {
  const [word, setWord] = useState('');

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-[#050810] text-slate-300 font-['Syne']">
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-6 rounded-2xl min-h-[500px] flex flex-col items-center">
        
        <div className="flex gap-4 w-full justify-center mb-8">
          <input 
             type="text" 
             value={word}
             onChange={e => setWord(e.target.value)}
             className="bg-slate-900 border border-slate-700 rounded px-4 py-2"
             placeholder="Enter word..."
          />
          <button className="bg-slate-800 border border-slate-600 px-4 py-2 rounded">Insert</button>
          <button className="bg-slate-800 border border-slate-600 px-4 py-2 rounded">Search</button>
        </div>
        
        <div className="text-xl font-bold mb-8 text-cyan-400 text-center w-full">Trie Data Structure</div>
        
        <svg width="600" height="400" className="border border-slate-800/50 rounded-xl bg-slate-900/20">
          <circle cx="300" cy="50" r="20" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <text x="300" y="55" textAnchor="middle" fill="#94a3b8" fontSize="14">root</text>
          
          <line x1="300" y1="70" x2="200" y2="130" stroke="#475569" strokeWidth="2" />
          <circle cx="200" cy="150" r="20" fill="#083344" stroke="#06b6d4" strokeWidth="2" />
          <text x="200" y="155" textAnchor="middle" fill="#cffafe" fontSize="16">c</text>
          
          <line x1="300" y1="70" x2="400" y2="130" stroke="#475569" strokeWidth="2" />
          <circle cx="400" cy="150" r="20" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <text x="400" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="16">b</text>

          <line x1="200" y1="170" x2="200" y2="230" stroke="#475569" strokeWidth="2" />
          <circle cx="200" cy="250" r="20" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <circle cx="200" cy="250" r="16" fill="transparent" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
          <text x="200" y="255" textAnchor="middle" fill="#e2e8f0" fontSize="16">a</text>
        </svg>

      </div>
    </div>
  );
}
