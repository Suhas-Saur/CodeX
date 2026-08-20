import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Gauge } from 'lucide-react';

interface AnimationControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onRestart: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  currentStep: number;
  totalSteps: number;
  disabled?: boolean;
}

const SPEEDS = [0.25, 0.5, 1, 1.5, 2, 3];

export function AnimationControls({
  isPlaying, onPlay, onPause, onStepForward, onStepBack, onRestart,
  speed, onSpeedChange, currentStep, totalSteps, disabled
}: AnimationControlsProps) {
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="bg-[#0a0f1e]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>Step {Math.max(0, currentStep + 1)} of {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={onRestart}
          disabled={disabled}
          className="p-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] transition-all disabled:opacity-40"
          title="Restart"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={onStepBack}
          disabled={disabled || currentStep <= -1}
          className="p-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] transition-all disabled:opacity-40"
          title="Step Back"
        >
          <SkipBack size={16} />
        </button>
        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={disabled || (totalSteps === 0)}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 transition-all disabled:opacity-40 shadow-lg shadow-cyan-500/30"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          onClick={onStepForward}
          disabled={disabled || currentStep >= totalSteps - 1}
          className="p-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] transition-all disabled:opacity-40"
          title="Step Forward"
        >
          <SkipForward size={16} />
        </button>

        {/* Speed */}
        <div className="ml-2 flex items-center gap-1.5">
          <Gauge size={14} className="text-slate-500" />
          <select
            value={speed}
            onChange={e => onSpeedChange(Number(e.target.value))}
            className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-slate-300 outline-none cursor-pointer"
          >
            {SPEEDS.map(s => (
              <option key={s} value={s} className="bg-[#0a0f1e]">{s}x</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
