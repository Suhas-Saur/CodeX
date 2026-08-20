import React, { useState, useCallback, useEffect } from 'react';
import { AnimationControls } from '../../components/ui/AnimationControls';
import { useAnimationEngine } from '../../engine/useAnimationEngine';
import { AlgoStep, VisualState } from '../../engine/types';
import { 
  linearSearchSteps, binarySearchSteps, jumpSearchSteps, 
  interpolationSearchSteps, exponentialSearchSteps, ternarySearchSteps 
} from './searchAlgorithms';

const ALGO_INFO = {
  linear: { name: 'Linear Search', reqSorted: false },
  binary: { name: 'Binary Search', reqSorted: true },
  jump: { name: 'Jump Search', reqSorted: true },
  interpolation: { name: 'Interpolation Search', reqSorted: true },
  exponential: { name: 'Exponential Search', reqSorted: true },
  ternary: { name: 'Ternary Search', reqSorted: true },
};

export const SearchVisualizer: React.FC = () => {
  const [arraySize, setArraySize] = useState(15);
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(50);
  const [algo, setAlgo] = useState<keyof typeof ALGO_INFO>('linear');
  const [isSorted, setIsSorted] = useState(false);
  const [steps, setSteps] = useState<AlgoStep[]>([]);
  
  const generateArray = useCallback((size: number, sorted: boolean) => {
    let newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    if (sorted) {
      newArr.sort((a, b) => a - b);
    }
    setArray(newArr);
  }, []);

  useEffect(() => {
    generateArray(arraySize, isSorted);
  }, [arraySize, isSorted, generateArray]);

  useEffect(() => {
    let generatedSteps: AlgoStep[] = [];
    if (ALGO_INFO[algo].reqSorted && !isSorted) {
      // Force sorted if needed
      setIsSorted(true);
      return;
    }

    switch (algo) {
      case 'linear': generatedSteps = linearSearchSteps(array, target); break;
      case 'binary': generatedSteps = binarySearchSteps(array, target); break;
      case 'jump': generatedSteps = jumpSearchSteps(array, target); break;
      case 'interpolation': generatedSteps = interpolationSearchSteps(array, target); break;
      case 'exponential': generatedSteps = exponentialSearchSteps(array, target); break;
      case 'ternary': generatedSteps = ternarySearchSteps(array, target); break;
    }
    setSteps(generatedSteps);
  }, [algo, array, target, isSorted]);

  const {
    currentStep,
    isPlaying,
    speed,
    play,
    pause,
    stepForward,
    stepBack,
    restart,
    setSpeed,
    loadSteps,
    totalSteps
  } = useAnimationEngine();

  useEffect(() => {
    loadSteps(steps);
  }, [steps, loadSteps]);

  const currentStepData = steps[currentStep] || { description: 'Ready', extra: {} };
  const extra = currentStepData.extra || {};
  const eliminated = extra.eliminated || [];

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-[#050810] text-slate-200 font-display">
      <div className="flex flex-wrap gap-4 justify-between items-center bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-4 rounded-xl">
        <div className="flex gap-4 items-center">
          <select 
            value={algo} 
            onChange={e => setAlgo(e.target.value as keyof typeof ALGO_INFO)}
            className="bg-slate-800 border border-slate-600 rounded p-2 text-white"
          >
            {Object.entries(ALGO_INFO).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
          
          <div className="flex items-center gap-2">
            <span>Target:</span>
            <input 
              type="number" 
              value={target}
              onChange={e => setTarget(Number(e.target.value))}
              className="bg-slate-800 border border-slate-600 rounded p-1 w-20 text-white"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isSorted} onChange={e => setIsSorted(e.target.checked)} disabled={ALGO_INFO[algo].reqSorted} />
            Sorted Array
          </label>

          <button onClick={() => generateArray(arraySize, isSorted)} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded">
            New Array
          </button>
        </div>
        
        <AnimationControls
          isPlaying={isPlaying}
          onPlay={play}
          onPause={pause}
          onStepForward={stepForward}
          onStepBack={stepBack}
          onRestart={restart}
          speed={speed}
          onSpeedChange={setSpeed}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      </div>

      <div className="flex-1 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl p-8 flex flex-col items-center justify-center">
        
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {array.map((val, idx) => {
            const isEliminated = eliminated.includes(idx);
            const isComparing = currentStepData.type === 'compare' && currentStepData.indices?.includes(idx);
            const isFound = currentStepData.type === 'markSorted' && currentStepData.indices?.includes(idx);
            const isError = currentStepData.type === 'error' && currentStepData.indices?.includes(idx);

            let bg = 'bg-slate-800';
            let border = 'border-slate-600';
            let text = 'text-slate-300';

            if (isEliminated) {
              bg = 'bg-slate-900';
              border = 'border-slate-800';
              text = 'text-slate-600';
            } else if (isFound) {
              bg = 'bg-pink-500/20';
              border = 'border-pink-400';
              text = 'text-pink-300';
            } else if (isComparing) {
              bg = 'bg-yellow-500/20';
              border = 'border-yellow-400';
              text = 'text-yellow-300';
            } else if (isError) {
              bg = 'bg-red-500/20';
              border = 'border-red-400';
              text = 'text-red-300';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 flex items-center justify-center rounded border-2 ${bg} ${border} ${text} text-xl font-mono transition-all duration-300`}>
                  {val}
                </div>
                
                <div className="h-6 text-xs font-mono font-bold text-cyan-400 flex flex-col items-center">
                  {!isEliminated && extra.left === idx && <span>↑ L</span>}
                  {!isEliminated && extra.right === idx && <span>↑ R</span>}
                  {!isEliminated && extra.mid === idx && <span className="text-yellow-400">↑ M</span>}
                </div>
                
                <div className="text-xs text-slate-500">{idx}</div>
              </div>
            );
          })}
        </div>
        
        <div className="text-xl text-center text-cyan-300 min-h-[3rem] p-4 bg-[#0a0f1c] rounded-lg border border-cyan-900/50 w-full max-w-3xl">
          {currentStepData.description}
        </div>

      </div>
    </div>
  );
};
