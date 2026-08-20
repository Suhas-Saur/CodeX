import { useState, useRef, useCallback, useEffect } from 'react';
import { AlgoStep } from './types';

export interface AnimationEngine {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  currentStepData: AlgoStep | null;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBack: () => void;
  restart: () => void;
  setSpeed: (speed: number) => void;
  loadSteps: (steps: AlgoStep[]) => void;
  reset: () => void;
  isFinished: boolean;
}

export function useAnimationEngine(onStepChange?: (step: number, data: AlgoStep | null) => void): AnimationEngine {
  const [steps, setSteps] = useState<AlgoStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeedState] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepsRef = useRef<AlgoStep[]>([]);
  const currentStepRef = useRef(-1);

  const speedToMs = (s: number) => {
    const map: Record<number, number> = { 0.25: 2000, 0.5: 1200, 1: 700, 1.5: 400, 2: 200, 3: 100 };
    return map[s] || 700;
  };

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const advance = useCallback(() => {
    setCurrentStep(prev => {
      const next = prev + 1;
      if (next >= stepsRef.current.length) {
        clearTimer();
        setIsPlaying(false);
        return prev;
      }
      currentStepRef.current = next;
      onStepChange?.(next, stepsRef.current[next]);
      return next;
    });
  }, [clearTimer, onStepChange]);

  const play = useCallback(() => {
    if (currentStepRef.current >= stepsRef.current.length - 1) return;
    setIsPlaying(true);
    clearTimer();
    intervalRef.current = setInterval(advance, speedToMs(speed));
  }, [advance, clearTimer, speed]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
  }, [clearTimer]);

  const stepForward = useCallback(() => {
    pause();
    setCurrentStep(prev => {
      const next = Math.min(prev + 1, stepsRef.current.length - 1);
      currentStepRef.current = next;
      onStepChange?.(next, stepsRef.current[next]);
      return next;
    });
  }, [pause, onStepChange]);

  const stepBack = useCallback(() => {
    pause();
    setCurrentStep(prev => {
      const next = Math.max(prev - 1, -1);
      currentStepRef.current = next;
      onStepChange?.(next, next >= 0 ? stepsRef.current[next] : null);
      return next;
    });
  }, [pause, onStepChange]);

  const restart = useCallback(() => {
    pause();
    setCurrentStep(-1);
    currentStepRef.current = -1;
    onStepChange?.(-1, null);
  }, [pause, onStepChange]);

  const setSpeed = useCallback((s: number) => {
    setSpeedState(s);
    if (intervalRef.current) {
      clearTimer();
      intervalRef.current = setInterval(advance, speedToMs(s));
    }
  }, [advance, clearTimer]);

  const loadSteps = useCallback((newSteps: AlgoStep[]) => {
    clearTimer();
    setIsPlaying(false);
    stepsRef.current = newSteps;
    setSteps(newSteps);
    setCurrentStep(-1);
    currentStepRef.current = -1;
    onStepChange?.(-1, null);
  }, [clearTimer, onStepChange]);

  const reset = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setSteps([]);
    stepsRef.current = [];
    setCurrentStep(-1);
    currentStepRef.current = -1;
    onStepChange?.(-1, null);
  }, [clearTimer, onStepChange]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const currentStepData = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;
  const isFinished = steps.length > 0 && currentStep >= steps.length - 1;

  return {
    currentStep,
    totalSteps: steps.length,
    isPlaying,
    speed,
    currentStepData,
    play,
    pause,
    stepForward,
    stepBack,
    restart,
    setSpeed,
    loadSteps,
    reset,
    isFinished,
  };
}
