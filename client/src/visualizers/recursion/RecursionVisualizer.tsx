import React, { useState, useMemo, useEffect } from 'react';
import { useAnimationEngine } from '../../engine/useAnimationEngine';
import { AnimationControls } from '../../components/ui/AnimationControls';
import { motion } from 'framer-motion';

export const RecursionVisualizer: React.FC = () => {
  const [problem, setProblem] = useState('fibonacci');
  const [n, setN] = useState(4);

  // Mock implementation for Recursion logic directly in visualizer for brevity
  const generateSteps = () => {
    const steps: any[] = [];
    let idCounter = 0;
    
    function fib(val: number, parentId: number | null): number {
      const id = idCounter++;
      steps.push({ type: 'call', extra: { id, val, parentId, action: 'call' }, description: `fib(${val}) called` });
      
      if (val <= 1) {
        steps.push({ type: 'return', extra: { id, val, parentId, action: 'return', result: val }, description: `fib(${val}) returns ${val}` });
        return val;
      }
      
      const left = fib(val - 1, id);
      const right = fib(val - 2, id);
      const res = left + right;
      
      steps.push({ type: 'return', extra: { id, val, parentId, action: 'return', result: res }, description: `fib(${val}) returns ${res}` });
      return res;
    }
    
    if (problem === 'fibonacci') fib(n, null);
    
    return steps;
  };

  const steps = React.useMemo(() => generateSteps(), [generateSteps]);
  const engine = useAnimationEngine();
  
  useEffect(() => {
    engine.loadSteps(steps);
  }, [steps, engine]);
  
  const currentStepIndex = engine.currentStep;
  
  // Reconstruct tree state based on current step
  const treeNodes = useMemo(() => {
    const nodes = new Map<number, any>();
    for (let i = 0; i <= currentStepIndex; i++) {
      const step = steps[i];
      if (!step) continue;
      
      if (step.extra.action === 'call') {
        nodes.set(step.extra.id, {
          id: step.extra.id,
          val: step.extra.val,
          parentId: step.extra.parentId,
          status: 'active',
          result: null
        });
      } else if (step.extra.action === 'return') {
        const node = nodes.get(step.extra.id);
        if (node) {
          node.status = 'completed';
          node.result = step.extra.result;
        }
      }
    }
    return Array.from(nodes.values());
  }, [steps, currentStepIndex]);

  const activeNodeId = steps[currentStepIndex]?.extra?.id;

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4 bg-[#050810] text-slate-300 font-sans">
      <div className="flex gap-4 items-center mb-4">
        <select 
          className="bg-slate-800 border border-slate-600 rounded p-2 text-white"
          value={problem} onChange={(e) => setProblem(e.target.value)}
        >
          <option value="fibonacci">Fibonacci</option>
        </select>
        
        <input type="number" min={1} max={7} value={n} onChange={e=>setN(Number(e.target.value))} className="bg-slate-800 border p-2 text-white w-24" />
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
        <p className="text-lg">{steps[currentStepIndex]?.description || 'Ready'}</p>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Tree View - Simplified visualization without complex layout math for this demo */}
        <div className="flex-1 bg-white/[0.04] rounded-xl border border-white/[0.08] p-4 overflow-auto flex flex-wrap gap-4 content-start">
          {treeNodes.map(node => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center w-24 h-24
                ${node.id === activeNodeId ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/30' : 
                  node.status === 'completed' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-800 border-slate-600'}
              `}
            >
              <div className="font-mono font-bold">fib({node.val})</div>
              {node.result !== null && (
                <div className="text-emerald-400 font-bold mt-2 text-xl">{node.result}</div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Call Stack Panel */}
        <div className="w-64 bg-slate-900 rounded-xl border border-slate-700 p-4 flex flex-col">
          <h3 className="text-slate-400 font-mono mb-4 border-b border-slate-700 pb-2">Call Stack</h3>
          <div className="flex-1 flex flex-col-reverse gap-2 overflow-auto">
             {treeNodes.filter(n => n.status === 'active').map(node => (
               <div key={`stack-${node.id}`} className={`p-2 rounded border font-mono
                 ${node.id === activeNodeId ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-800 border-slate-600 text-slate-400'}
               `}>
                 fib({node.val})
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecursionVisualizer;
