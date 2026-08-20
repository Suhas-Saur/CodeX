import React, { useState, useCallback, useEffect } from 'react';
import { useAnimationEngine } from '../../engine/useAnimationEngine';
import { AnimationControls } from '../../components/ui/AnimationControls';
import { nQueensSteps } from './backtrackingAlgorithms';
import { motion } from 'framer-motion';

export const BacktrackingVisualizer: React.FC = () => {
  const [problem, setProblem] = useState('nqueens');
  const [n, setN] = useState(4);
  
  const generateSteps = useCallback(() => {
    switch (problem) {
      case 'nqueens': return nQueensSteps(n);
      default: return [];
    }
  }, [problem, n]);

  const steps = React.useMemo(() => generateSteps(), [generateSteps]);
  const engine = useAnimationEngine();
  
  useEffect(() => {
    engine.loadSteps(steps);
  }, [steps, engine]);

  const currentStep = engine.currentStepData;
  const board = currentStep?.extra?.board || Array(n).fill(null).map(() => Array(n).fill(0));
  const cRow = currentStep?.extra?.currentRow;
  const cCol = currentStep?.extra?.currentCol;
  const action = currentStep?.extra?.action;

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4 bg-[#050810] text-slate-300 font-sans">
      <div className="flex gap-4 items-center mb-4">
        <select 
          className="bg-slate-800 border border-slate-600 rounded p-2 text-white"
          value={problem} onChange={(e) => setProblem(e.target.value)}
        >
          <option value="nqueens">N-Queens</option>
        </select>
        
        {problem === 'nqueens' && (
          <input type="number" min={4} max={8} value={n} onChange={e=>setN(Number(e.target.value))} className="bg-slate-800 border p-2 text-white w-24" />
        )}
      </div>

      <AnimationControls
        isPlaying={engine.isPlaying}
        onPlay={engine.play}
        onPause={engine.pause}
        onStepForward={engine.stepForward}
        onStepBack={engine.stepBack}
        onRestart={engine.restart}
        speed={engine.speed}
        onSpeedChange={engine.setSpeed}
        currentStep={engine.currentStep}
        totalSteps={engine.totalSteps}
      />

      <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-600/30 mb-4 h-16">
        <p className="text-lg">{currentStep?.description || 'Ready'}</p>
      </div>

      <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-white/[0.04] rounded-xl border border-white/[0.08]">
        {problem === 'nqueens' && (
          <div className="inline-block border-2 border-slate-700 bg-slate-900">
            {board.map((row: number[], i: number) => (
              <div key={i} className="flex">
                {row.map((cell: number, j: number) => {
                  const isLight = (i + j) % 2 === 0;
                  const isActive = cRow === i && cCol === j;
                  const isError = isActive && action === 'check' && currentStep?.type === 'error';
                  const isBacktrack = isActive && action === 'backtrack';
                  
                  return (
                    <motion.div
                      key={`${i}-${j}`}
                      initial={false}
                      animate={{
                        backgroundColor: isError || isBacktrack ? '#ef4444' : isActive ? '#eab308' : isLight ? '#334155' : '#0f172a',
                        scale: isActive ? 1.05 : 1
                      }}
                      className={`w-16 h-16 flex items-center justify-center text-4xl transition-colors duration-300
                        ${isLight ? 'bg-slate-700' : 'bg-slate-900'}
                      `}
                    >
                      {cell === 1 && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className={`${action === 'success' ? 'text-emerald-400' : 'text-slate-100'}`}
                        >
                          ♛
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BacktrackingVisualizer;
