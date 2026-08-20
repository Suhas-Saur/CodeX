import React, { useState, useCallback, useEffect } from 'react';
import { useAnimationEngine } from '../../engine/useAnimationEngine';
import { AnimationControls } from '../../components/ui/AnimationControls';
import { fibonacciDPSteps, knapsackSteps, coinChangeSteps, lcsSteps } from './dpAlgorithms';

export const DPVisualizer: React.FC = () => {
  const [problem, setProblem] = useState('fibonacci');
  const [fibN, setFibN] = useState(5);
  const [s1, setS1] = useState('abcde');
  const [s2, setS2] = useState('ace');
  
  const generateSteps = useCallback(() => {
    switch (problem) {
      case 'fibonacci': return fibonacciDPSteps(fibN);
      case 'lcs': return lcsSteps(s1, s2);
      case 'knapsack': return knapsackSteps([1,3,4], [15,20,30], 4);
      case 'coinchange': return coinChangeSteps([1,2,5], 11);
      default: return [];
    }
  }, [problem, fibN, s1, s2]);

  const steps = React.useMemo(() => generateSteps(), [generateSteps]);
  const engine = useAnimationEngine();
  
  useEffect(() => {
    engine.loadSteps(steps);
  }, [steps, engine]);

  const currentStep = engine.currentStepData;
  const table = currentStep?.extra?.table || [];
  const activeCell = currentStep?.extra?.activeCell;
  const deps = currentStep?.extra?.dependencyCells || [];

  const isActive = (i: number, j: number) => activeCell?.[0] === i && activeCell?.[1] === j;
  const isDependency = (i: number, j: number) => deps.some((d: [number, number]) => d[0] === i && d[1] === j);

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4 bg-[#050810] text-slate-300 font-sans">
      <div className="flex gap-4 items-center mb-4">
        <select 
          className="bg-slate-800 border border-slate-600 rounded p-2 text-white"
          value={problem} onChange={(e) => setProblem(e.target.value)}
        >
          <option value="fibonacci">Fibonacci</option>
          <option value="lcs">LCS</option>
          <option value="knapsack">Knapsack</option>
          <option value="coinchange">Coin Change</option>
        </select>
        
        {problem === 'fibonacci' && (
          <input type="number" value={fibN} onChange={e=>setFibN(Number(e.target.value))} className="bg-slate-800 border p-2 text-white w-24" />
        )}
        {problem === 'lcs' && (
          <>
            <input value={s1} onChange={e=>setS1(e.target.value)} className="bg-slate-800 border p-2 text-white w-32" />
            <input value={s2} onChange={e=>setS2(e.target.value)} className="bg-slate-800 border p-2 text-white w-32" />
          </>
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
        <p className="text-cyan-400 font-mono">{currentStep?.extra?.formula}</p>
      </div>

      <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-white/[0.04] rounded-xl border border-white/[0.08]">
        <table className="border-collapse">
          {problem === 'lcs' && currentStep?.extra?.text2 && (
            <thead>
              <tr>
                <th className="w-8 h-8" />
                <th className="w-12 h-12 text-center text-slate-400 font-mono text-sm"></th>
                {currentStep.extra.text2.split('').map((c: string, j: number) => (
                  <th key={j} className="w-12 h-12 text-center text-slate-400 font-mono text-sm">{c}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {table.map((row: any, i: number) => (
              <tr key={i}>
                {problem === 'lcs' && currentStep?.extra?.text1 && (
                  <th className="text-slate-400 font-mono text-sm text-center w-12">{i > 0 ? currentStep.extra.text1[i-1] : ''}</th>
                )}
                {row.map((cell: any, j: number) => (
                  <td
                    key={j}
                    className={`w-12 h-12 border border-white/[0.08] text-center font-mono font-bold transition-all duration-300
                      ${isActive(i, j) ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/30' : ''}
                      ${isDependency(i, j) ? 'bg-purple-500/20 border-purple-400 text-purple-300' : ''}
                      ${cell !== -1 && !isActive(i, j) && !isDependency(i, j) ? 'bg-white/[0.04] text-slate-300' : ''}
                      ${cell === -1 ? 'text-slate-600' : ''}`}
                  >
                    {cell === -1 ? '' : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DPVisualizer;
