import React from 'react';
import { useProgress } from '../engine/useProgress';
import { Trophy, Star, Activity, Target } from 'lucide-react';
// Assuming Recharts is available. If not, this acts as placeholder structure.

export function ProgressPage() {
  const { progress } = useProgress();

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-300 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Your Progress</h1>
          <p className="text-slate-400">Track your learning journey and achievements.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-400"><Star size={24}/></div>
            <div><div className="text-2xl font-bold text-white">2,450</div><div className="text-sm text-slate-400">Total XP</div></div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400"><Activity size={24}/></div>
            <div><div className="text-2xl font-bold text-white">12 Days</div><div className="text-sm text-slate-400">Current Streak</div></div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400"><Target size={24}/></div>
            <div><div className="text-2xl font-bold text-white">85%</div><div className="text-sm text-slate-400">Quiz Accuracy</div></div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400"><Trophy size={24}/></div>
            <div><div className="text-2xl font-bold text-white">15/40</div><div className="text-sm text-slate-400">Topics Done</div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] h-80 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-white mb-4 w-full text-left">Activity Chart (Placeholder)</h3>
            <div className="w-full h-full bg-white/[0.02] border border-dashed border-white/[0.1] rounded flex items-center justify-center text-slate-500">Recharts Area</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] h-80 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-white mb-4 w-full text-left">Topic Completion (Placeholder)</h3>
            <div className="w-full h-full bg-white/[0.02] border border-dashed border-white/[0.1] rounded flex items-center justify-center text-slate-500">Recharts Area</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProgressPage;
