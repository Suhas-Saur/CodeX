import React, { useState, useEffect, useCallback } from 'react';
import { useAnimationEngine } from '../../engine/useAnimationEngine';
import { AnimationControls } from '../../components/ui/AnimationControls';
import { VisualState, AlgoStep } from '../../engine/types';
import { insertAtStep, deleteAtStep, searchStep, reverseStep, rotateLeftStep, traverseStep, updateStep } from './arrayAlgorithms';


export function ArrayVisualizer() {
  const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50, 60, 70]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  
  const engine = useAnimationEngine();
  const currentStepData = engine.currentStepData as AlgoStep | null;

  const handleAction = (action: string) => {
    engine.reset();
    let steps: AlgoStep[] = [];
    const val = parseInt(inputValue);
    const idx = parseInt(inputIndex);

    switch(action) {
      case 'Search':
        if (!isNaN(val)) steps = searchStep(array, val);
        break;
      case 'Insert':
        if (!isNaN(val) && !isNaN(idx)) steps = insertAtStep(array, idx, val);
        break;
      case 'Delete':
        if (!isNaN(idx)) steps = deleteAtStep(array, idx);
        break;
      case 'Update':
        if (!isNaN(val) && !isNaN(idx)) steps = updateStep(array, idx, val);
        break;
      case 'Reverse':
        steps = reverseStep(array);
        break;
      case 'Rotate':
        if (!isNaN(val)) steps = rotateLeftStep(array, val);
        break;
      case 'Traverse':
        steps = traverseStep(array);
        break;
    }
    
    if (steps.length > 0) {
      engine.loadSteps(steps);
      engine.play();
    }
  };

  useEffect(() => {
    if (currentStepData && currentStepData.extra && currentStepData.extra.newArray) {
      setArray(currentStepData.extra.newArray);
    }
  }, [currentStepData]);

  const getVisualStateClass = (index: number) => {
    if (!currentStepData || !currentStepData.indices) return 'bg-slate-800/60 border-slate-600/30 text-slate-300';
    if (!currentStepData.indices.includes(index)) return 'bg-slate-800/60 border-slate-600/30 text-slate-300';
    
    switch (currentStepData.type) {
      case 'visit': return 'bg-purple-500/20 border-purple-400 text-purple-300';
      case 'compare': return 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-lg shadow-yellow-500/30';
      case 'swap': return 'bg-orange-500/20 border-orange-400 text-orange-300 shadow-lg shadow-orange-500/30';
      case 'found': return 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/30';
      case 'insert': return 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/30';
      case 'delete': return 'bg-red-500/20 border-red-400 text-red-300';
      case 'update': return 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/30';
      case 'shift': return 'bg-blue-500/20 border-blue-400 text-blue-300';
      case 'highlight': return 'bg-blue-500/20 border-blue-400 text-blue-300';
      default: return 'bg-slate-800/60 border-slate-600/30 text-slate-300';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#050810] min-h-screen text-slate-300 font-display">
      <div className="mb-8 flex gap-4">
        <input 
          type="number" 
          placeholder="Value" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="px-4 py-2 bg-slate-800/60 border border-slate-600/30 rounded text-slate-300"
        />
        <input 
          type="number" 
          placeholder="Index/K" 
          value={inputIndex}
          onChange={(e) => setInputIndex(e.target.value)}
          className="px-4 py-2 bg-slate-800/60 border border-slate-600/30 rounded text-slate-300"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {['Search', 'Insert', 'Delete', 'Update', 'Reverse', 'Rotate', 'Traverse'].map(action => (
          <button 
            key={action}
            onClick={() => handleAction(action)}
            className="px-4 py-2 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded hover:bg-white/[0.1] transition-all duration-300"
          >
            {action}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-12">
        {array.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className={`w-16 h-16 flex items-center justify-center text-xl border rounded transition-all duration-300 ${getVisualStateClass(idx)}`}>
              {val}
            </div>
            <div className="mt-2 text-xs font-mono text-slate-500">[{idx}]</div>
            <div className="text-xs font-mono text-slate-600">0x{1000 + idx * 4}</div>
          </div>
        ))}
      </div>

      <div className="h-12 text-lg text-cyan-400 mb-8 font-mono">
        {currentStepData?.description || 'Ready'}
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
    </div>
  );
}

export default ArrayVisualizer;
