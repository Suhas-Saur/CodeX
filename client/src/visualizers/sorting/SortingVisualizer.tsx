import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AnimationControls } from '../../components/ui/AnimationControls';
import { CodePanel } from '../../components/ui/CodePanel';
import { useAnimationEngine } from '../../engine/useAnimationEngine';
import { AlgoStep, ArrayElement, VisualState } from '../../engine/types';
import { 
  bubbleSortSteps, selectionSortSteps, insertionSortSteps, 
  mergeSortSteps, quickSortSteps, heapSortSteps, 
  countingSortSteps, shellSortSteps
} from './sortingAlgorithms';
import { Shuffle, Play, Settings, BarChart } from 'lucide-react';

const ALGO_INFO = {
  bubble: { name: 'Bubble Sort', time: 'O(n²)', space: 'O(1)', stable: true },
  selection: { name: 'Selection Sort', time: 'O(n²)', space: 'O(1)', stable: false },
  insertion: { name: 'Insertion Sort', time: 'O(n) best, O(n²) worst', space: 'O(1)', stable: true },
  merge: { name: 'Merge Sort', time: 'O(n log n)', space: 'O(n)', stable: true },
  quick: { name: 'Quick Sort', time: 'O(n log n) avg, O(n²) worst', space: 'O(log n)', stable: false },
  heap: { name: 'Heap Sort', time: 'O(n log n)', space: 'O(1)', stable: false },
  counting: { name: 'Counting Sort', time: 'O(n+k)', space: 'O(k)', stable: true },
  shell: { name: 'Shell Sort', time: 'O(n log n)', space: 'O(1)', stable: false },
};

export const SortingVisualizer: React.FC = () => {
  const [arraySize, setArraySize] = useState(20);
  const [initialArray, setInitialArray] = useState<number[]>([]);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [algo, setAlgo] = useState<keyof typeof ALGO_INFO>('bubble');
  const [steps, setSteps] = useState<AlgoStep[]>([]);
  const [visualStates, setVisualStates] = useState<VisualState[]>([]);
  const [customInput, setCustomInput] = useState('');
  
  const generateArray = useCallback((size: number) => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    setInitialArray(newArr);
    setCurrentArray(newArr);
    setVisualStates(new Array(size).fill('normal'));
  }, []);

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize, generateArray]);

  useEffect(() => {
    let generatedSteps: AlgoStep[] = [];
    switch (algo) {
      case 'bubble': generatedSteps = bubbleSortSteps(initialArray); break;
      case 'selection': generatedSteps = selectionSortSteps(initialArray); break;
      case 'insertion': generatedSteps = insertionSortSteps(initialArray); break;
      case 'merge': generatedSteps = mergeSortSteps(initialArray); break;
      case 'quick': generatedSteps = quickSortSteps(initialArray); break;
      case 'heap': generatedSteps = heapSortSteps(initialArray); break;
      case 'counting': generatedSteps = countingSortSteps(initialArray); break;
      case 'shell': generatedSteps = shellSortSteps(initialArray); break;
    }
    setSteps(generatedSteps);
  }, [algo, initialArray]);

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

  useEffect(() => {
    // Replay steps up to currentStep to reconstruct state
    let arr = [...initialArray];
    let states = new Array(arr.length).fill('normal');
    
    for (let i = 0; i <= currentStep; i++) {
      const step = steps[i];
      if (!step) continue;

      states = states.map(s => s === 'sorted' ? 'sorted' : 'normal'); // Reset transient states

      if (step.type === 'compare') {
        step.indices?.forEach(idx => { if (states[idx] !== 'sorted') states[idx] = 'comparing' });
      } else if (step.type === 'swap') {
        if (step.indices && step.indices.length === 2) {
          const [i, j] = step.indices;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          states[i] = 'swapping';
          states[j] = 'swapping';
        }
      } else if (step.type === 'markSorted') {
        step.indices?.forEach(idx => states[idx] = 'sorted');
      } else if (step.type === 'setPivot') {
        step.indices?.forEach(idx => states[idx] = 'active');
      }
      
      if (step.extra?.sorted) {
        step.extra.sorted?.forEach((idx: number) => states[idx] = 'sorted');
      }
    }
    setCurrentArray(arr);
    setVisualStates(states);
  }, [currentStep, steps, initialArray]);

  const maxVal = Math.max(...initialArray, 1);
  const currentStepInfo = steps[currentStep] || { description: 'Ready' };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-[#050810] text-slate-200 font-display">
      <div className="flex justify-between items-center bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-4 rounded-xl">
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
          <button onClick={() => generateArray(arraySize)} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded">
            <Shuffle size={16} /> Randomize
          </button>
          <div className="flex items-center gap-2">
            <span>Size:</span>
            <input type="range" min="5" max="50" value={arraySize} onChange={(e) => setArraySize(Number(e.target.value))} />
            <span>{arraySize}</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
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
      </div>

      <div className="flex gap-6">
        <div className="flex-1 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-full flex items-end justify-center gap-1 h-64">
            {currentArray.map((val, idx) => {
              const state = visualStates[idx];
              let color = 'bg-slate-500';
              if (state === 'comparing') color = 'bg-yellow-400';
              if (state === 'swapping') color = 'bg-orange-400';
              if (state === 'sorted') color = 'bg-emerald-400';
              if (state === 'active') color = 'bg-cyan-400';

              return (
                <div key={idx} className="flex flex-col items-center justify-end" style={{ height: '100%', width: `${100/arraySize}%`, maxWidth: '40px' }}>
                  {arraySize <= 20 && <span className="text-xs mb-1 text-slate-400">{val}</span>}
                  <div 
                    className={`w-full ${color} rounded-t-sm transition-all duration-300`} 
                    style={{ height: `${(val / maxVal) * 100}%` }}
                  />
                  {arraySize <= 20 && <span className="text-xs mt-1 text-slate-500">{idx}</span>}
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center text-lg text-cyan-300 min-h-[2rem]">
            {currentStepInfo.description}
          </div>
        </div>
        
        <div className="w-80 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 flex flex-col gap-4">
          <h3 className="text-xl text-white font-bold mb-2">{ALGO_INFO[algo].name}</h3>
          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span className="text-slate-400">Time Complexity</span>
            <span className="text-cyan-400 font-mono">{ALGO_INFO[algo].time}</span>
          </div>
          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span className="text-slate-400">Space Complexity</span>
            <span className="text-cyan-400 font-mono">{ALGO_INFO[algo].space}</span>
          </div>
          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span className="text-slate-400">Stable</span>
            <span className="text-cyan-400">{ALGO_INFO[algo].stable ? 'Yes' : 'No'}</span>
          </div>
          
          <div className="mt-4">
            <h4 className="text-slate-400 mb-2">Step Info</h4>
            <div className="bg-[#0a0f1c] rounded p-4 text-sm font-mono whitespace-pre-wrap break-words h-32 overflow-y-auto border border-slate-800 text-slate-300">
              {JSON.stringify(currentStepInfo, null, 2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
