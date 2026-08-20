import { AlgoStep } from '../../engine/types';

export interface LinkedListNode {
  id: string;
  value: number;
  next: string | null;
}

export interface LLState {
  nodes: LinkedListNode[];
  head: string | null;
}

export function insertAtBeginningSteps(state: LLState, value: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  return steps;
}

export function insertAtEndSteps(state: LLState, value: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  return steps;
}

export function insertAtPositionSteps(state: LLState, value: number, position: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  return steps;
}

export function deleteBeginningSteps(state: LLState): AlgoStep[] {
  const steps: AlgoStep[] = [];
  return steps;
}

export function deleteEndSteps(state: LLState): AlgoStep[] {
  const steps: AlgoStep[] = [];
  return steps;
}

export function deleteAtPositionSteps(state: LLState, position: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  return steps;
}

export function searchSteps(state: LLState, target: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  return steps;
}

export function reverseSteps(state: LLState): AlgoStep[] {
  const steps: AlgoStep[] = [];
  return steps;
}

export function traverseSteps(state: LLState): AlgoStep[] {
  const steps: AlgoStep[] = [];
  return steps;
}
