import React, { useState } from 'react';
import { BookOpen, CheckCircle, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PracticePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const questions = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays', solved: true },
    { id: 2, title: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', solved: false },
    { id: 3, title: 'Number of Islands', difficulty: 'Medium', topic: 'Graph', solved: false },
    { id: 4, title: 'Longest Palindromic Substring', difficulty: 'Medium', topic: 'Strings', solved: false },
    { id: 5, title: 'Merge K Sorted Lists', difficulty: 'Hard', topic: 'Heap', solved: false }
  ];

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-300 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Practice Problems</h1>
          <p className="text-slate-400">Apply your knowledge with selected problems.</p>
        </header>

        <div className="flex gap-2">
          {['All', 'Easy', 'Medium', 'Hard'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === f ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' : 'bg-white/[0.04] border border-transparent hover:bg-white/[0.1]'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {questions.filter(q => filter === 'All' || q.difficulty === filter).map(q => (
            <div key={q.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] transition-colors">
              <div className="flex items-center gap-4">
                {q.solved ? <CheckCircle className="text-emerald-400" size={20}/> : <div className="w-5 h-5 rounded-full border-2 border-slate-600"/>}
                <div>
                  <h3 className="text-lg font-medium text-white">{q.title}</h3>
                  <div className="flex gap-2 mt-1 text-xs">
                    <span className={`px-2 py-0.5 rounded ${q.difficulty==='Easy'?'bg-green-500/20 text-green-400':q.difficulty==='Medium'?'bg-yellow-500/20 text-yellow-400':'bg-red-500/20 text-red-400'}`}>{q.difficulty}</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.1] text-slate-300">{q.topic}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => navigate('/visualizer')} className="p-2 rounded bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors" title="Visualize">
                <Play size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PracticePage;
