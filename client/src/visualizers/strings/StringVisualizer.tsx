import React, { useState, useCallback, useEffect } from 'react';
import { useAnimationEngine } from '../../engine/useAnimationEngine';
import { AnimationControls } from '../../components/ui/AnimationControls';
import { kmpSteps } from './stringAlgorithms';
import { motion } from 'framer-motion';

export const StringVisualizer: React.FC = () => {
  const [problem, setProblem] = useState('kmp');
  const [text, setText] = useState('ABABDABACDABABCABAB');
  const [pattern, setPattern] = useState('ABABCABAB');
  
  const generateSteps = useCallback(() => {
    switch (problem) {
      case 'kmp': return kmpSteps(text, pattern);
      default: return [];
    }
  }, [problem, text, pattern]);

  const steps = React.useMemo(() => generateSteps(), [generateSteps]);
  const engine = useAnimationEngine();
  
  useEffect(() => {
    engine.loadSteps(steps);
  }, [steps, engine]);

  const currentStep = engine.currentStepData;
  const lps = currentStep?.extra?.lps || [];
  const textPtr = currentStep?.extra?.textPointer || 0;
  const patPtr = currentStep?.extra?.patternPointer || 0;
  const matched = currentStep?.extra?.matched;
  const isBuildingLps = currentStep?.extra?.isBuildingLps;
  const foundAt = currentStep?.extra?.foundAt;

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4 bg-[#050810] text-slate-300 font-sans">
      <div className="flex gap-4 items-center mb-4">
        <select 
          className="bg-slate-800 border border-slate-600 rounded p-2 text-white"
          value={problem} onChange={(e) => setProblem(e.target.value)}
        >
          <option value="kmp">KMP Algorithm</option>
        </select>
        
        <input value={text} onChange={e=>setText(e.target.value)} className="bg-slate-800 border p-2 text-white w-64" placeholder="Text" />
        <input value={pattern} onChange={e=>setPattern(e.target.value)} className="bg-slate-800 border p-2 text-white w-32" placeholder="Pattern" />
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

      <div className="flex-1 overflow-auto flex flex-col items-center justify-start p-8 gap-12 bg-white/[0.04] rounded-xl border border-white/[0.08]">
        
        {isBuildingLps && (
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-cyan-400 mb-2">Building LPS Array</h3>
            <div className="flex">
              {pattern.split('').map((c, i) => (
                <div key={`pat-${i}`} className="w-12 h-12 flex flex-col items-center border border-slate-600 bg-slate-800">
                  <div className="h-1/2 flex items-center text-slate-300 font-mono">{c}</div>
                  <div className={`h-1/2 w-full flex items-center justify-center font-mono font-bold
                    ${currentStep?.indices?.includes(i) ? 'bg-cyan-500/50 text-white' : 'bg-slate-700 text-slate-400'}
                  `}>
                    {lps[i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isBuildingLps && currentStep && (
          <div className="flex flex-col gap-8 w-full max-w-4xl">
            {/* Text Array */}
            <div className="flex flex-col">
              <div className="text-sm text-slate-400 mb-1">Text (i = {textPtr})</div>
              <div className="flex flex-wrap border border-slate-700 bg-slate-900 rounded overflow-hidden">
                {text.split('').map((c, i) => {
                  const isCurrent = i === textPtr;
                  const isFound = foundAt !== undefined && i >= foundAt && i < foundAt + pattern.length;
                  return (
                    <motion.div
                      key={`t-${i}`}
                      animate={{
                        backgroundColor: isFound ? 'rgba(16, 185, 129, 0.2)' : isCurrent ? 'rgba(6, 182, 212, 0.3)' : 'transparent',
                        borderColor: isCurrent ? '#22d3ee' : '#334155'
                      }}
                      className={`w-10 h-10 flex items-center justify-center font-mono text-lg border-r border-b
                        ${isCurrent ? 'text-cyan-300 border-2 z-10' : 'text-slate-300'}
                        ${isFound ? 'text-emerald-400 font-bold' : ''}
                      `}
                    >
                      {c}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Pattern Array */}
            <div className="flex flex-col" style={{ marginLeft: `${Math.max(0, textPtr - patPtr) * 2.5}rem` }}>
              <div className="text-sm text-slate-400 mb-1">Pattern (j = {patPtr})</div>
              <div className="flex border border-slate-700 bg-slate-900 rounded overflow-hidden w-fit">
                {pattern.split('').map((c, i) => {
                  const isCurrent = i === patPtr;
                  const isMatch = matched && isCurrent;
                  const isMismatch = currentStep.type === 'compare' && !matched && isCurrent && text[textPtr] !== pattern[patPtr];
                  return (
                    <motion.div
                      key={`p-${i}`}
                      animate={{
                        backgroundColor: isMatch ? 'rgba(16, 185, 129, 0.3)' : isMismatch ? 'rgba(239, 68, 68, 0.3)' : isCurrent ? 'rgba(6, 182, 212, 0.3)' : 'transparent',
                      }}
                      className={`w-10 h-10 flex items-center justify-center font-mono text-lg border-r border-b
                        ${isCurrent ? 'text-white font-bold border-b-2 border-cyan-400' : 'text-slate-400'}
                        ${isMatch ? 'text-emerald-400' : ''}
                        ${isMismatch ? 'text-red-400' : ''}
                      `}
                    >
                      {c}
                    </motion.div>
                  )
                })}
              </div>
            </div>
            
            {/* LPS Array Mini View */}
            {lps.length > 0 && (
               <div className="mt-8 flex gap-2 items-center">
                 <span className="text-slate-500 font-mono text-sm">LPS:</span>
                 <div className="flex">
                  {lps.map((val: number, i: number) => (
                    <div key={`lps-${i}`} className={`w-8 h-8 flex items-center justify-center text-xs border border-slate-700 ${i === patPtr - 1 ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400'}`}>{val}</div>
                  ))}
                 </div>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StringVisualizer;
