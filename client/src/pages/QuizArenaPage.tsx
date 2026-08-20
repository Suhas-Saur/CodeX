import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Star, Zap } from 'lucide-react';
import { useProgress } from '../engine/useProgress';

type QuizPhase = 'home' | 'playing' | 'answered' | 'complete';

export function QuizArenaPage() {
  const [phase, setPhase] = useState<QuizPhase>('home');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const { progress } = useProgress();

  const startQuiz = () => {
    setScore(0);
    setStreak(0);
    setPhase('playing');
  };

  const answerQuestion = (correct: boolean) => {
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    setPhase('answered');
  };

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-300 flex items-center justify-center p-6">
      {phase === 'home' && (
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-4">
            <Trophy className="mx-auto text-yellow-400" size={64} />
            <h1 className="text-5xl font-display font-bold text-white">Quiz Arena</h1>
            <p className="text-xl text-slate-400">Test your DSA knowledge and earn XP.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { title: 'Quick Quiz', desc: '10 random questions', icon: <Zap />, color: 'cyan' },
              { title: 'Challenge', desc: '30 tough questions', icon: <Star />, color: 'purple' },
              { title: 'Topic Quiz', desc: 'Select a specific topic', icon: <Trophy />, color: 'emerald' },
              { title: 'Timed Interview', desc: '20 minutes pressure', icon: <Clock />, color: 'red' }
            ].map(q => (
              <button key={q.title} onClick={startQuiz} className={`p-6 text-left rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-${q.color}-400/50 hover:bg-${q.color}-500/10 transition-all group backdrop-blur-xl`}>
                <div className={`text-${q.color}-400 mb-4 group-hover:scale-110 transition-transform`}>{q.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{q.title}</h3>
                <p className="text-slate-400">{q.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'playing' && (
        <div className="max-w-2xl w-full">
          <div className="flex justify-between items-center mb-8">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Question 1/10</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-yellow-400 font-bold"><Zap size={16}/> Streak: {streak}</span>
              <span className="text-xl font-mono text-white">05:00</span>
            </div>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.08] p-8 rounded-2xl backdrop-blur-xl mb-6">
            <h2 className="text-2xl text-white font-medium mb-6">What is the worst-case time complexity of Quick Sort?</h2>
            <div className="space-y-3">
              {['O(n log n)', 'O(n)', 'O(n²)', 'O(1)'].map((opt, i) => (
                <button key={i} onClick={() => answerQuestion(i === 2)} className="w-full text-left p-4 rounded-xl border border-white/[0.08] bg-black/40 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all text-lg">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {phase === 'answered' && (
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="p-8 rounded-2xl bg-white/[0.04] border border-emerald-500/30 backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-emerald-400 mb-4">Correct!</h2>
            <p className="text-slate-300">Quick sort degenerates to O(n²) when the pivot chosen is consistently the largest or smallest element (e.g., already sorted array with poorly chosen pivot).</p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="text-yellow-400 font-bold text-xl flex items-center gap-2"><Star /> +10 XP</div>
            </div>
          </div>
          <button onClick={() => setPhase('complete')} className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
            Next Question
          </button>
        </div>
      )}

      {phase === 'complete' && (
        <div className="max-w-md w-full text-center space-y-8 p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
          <Trophy className="mx-auto text-yellow-400" size={80} />
          <h2 className="text-4xl font-display font-bold text-white">Quiz Complete!</h2>
          <div className="text-6xl font-mono text-cyan-400 font-bold">{score}/10</div>
          <p className="text-lg text-slate-400">Accuracy: {score * 10}%</p>
          <div className="flex gap-4 justify-center pt-4">
            <button onClick={() => setPhase('home')} className="px-6 py-3 bg-white/[0.1] text-white font-bold rounded-lg hover:bg-white/[0.2] transition-colors">Return Home</button>
            <button onClick={startQuiz} className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default QuizArenaPage;
