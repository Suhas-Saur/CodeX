import { StepType } from '../../engine/types';

export interface AlgoStep {
  type: StepType;
  description: string;
  indices?: number[];
  value?: any;
  extra?: Record<string, any>;
}

export function insertAtStep(arr: number[], index: number, value: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const currentArray = [...arr];

  steps.push({ type: 'info', description: `Inserting value ${value} at index ${index}` });

  for (let i = currentArray.length; i > index; i--) {
    steps.push({ type: 'highlight', description: `Checking position ${i}`, indices: [i, i - 1] });
    steps.push({ type: 'shift', description: `Shifting element at index ${i - 1} to index ${i}`, indices: [i, i - 1] });
    currentArray[i] = currentArray[i - 1];
    steps.push({ type: 'update', description: `Shifted`, indices: [i], extra: { newArray: [...currentArray] } });
  }

  steps.push({ type: 'insert', description: `Inserting ${value} at index ${index}`, indices: [index] });
  currentArray[index] = value;
  steps.push({ type: 'update', description: `Insertion complete`, indices: [index], extra: { newArray: [...currentArray] } });

  return steps;
}

export function deleteAtStep(arr: number[], index: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const currentArray = [...arr];

  steps.push({ type: 'info', description: `Deleting value at index ${index}` });
  steps.push({ type: 'delete', description: `Removing ${currentArray[index]} from index ${index}`, indices: [index] });
  
  for (let i = index; i < currentArray.length - 1; i++) {
    steps.push({ type: 'highlight', description: `Checking position ${i}`, indices: [i, i + 1] });
    steps.push({ type: 'shift', description: `Shifting element at index ${i + 1} to index ${i}`, indices: [i, i + 1] });
    currentArray[i] = currentArray[i + 1];
    steps.push({ type: 'update', description: `Shifted`, indices: [i], extra: { newArray: [...currentArray] } });
  }

  currentArray.pop();
  steps.push({ type: 'update', description: `Deletion complete`, indices: [], extra: { newArray: [...currentArray] } });

  return steps;
}

export function searchStep(arr: number[], target: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  steps.push({ type: 'info', description: `Searching for value ${target}` });
  for (let i = 0; i < arr.length; i++) {
    steps.push({ type: 'visit', description: `Checking index ${i}`, indices: [i] });
    steps.push({ type: 'compare', description: `Comparing ${arr[i]} with ${target}`, indices: [i] });
    if (arr[i] === target) {
      steps.push({ type: 'found', description: `Found ${target} at index ${i}`, indices: [i] });
      return steps;
    }
  }
  steps.push({ type: 'notFound', description: `Value ${target} not found`, indices: [] });
  return steps;
}

export function reverseStep(arr: number[]): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const currentArray = [...arr];
  let left = 0;
  let right = currentArray.length - 1;

  steps.push({ type: 'info', description: `Reversing the array` });
  while (left < right) {
    steps.push({ type: 'compare', description: `Comparing indices ${left} and ${right}`, indices: [left, right] });
    steps.push({ type: 'swap', description: `Swapping ${currentArray[left]} and ${currentArray[right]}`, indices: [left, right] });
    const temp = currentArray[left];
    currentArray[left] = currentArray[right];
    currentArray[right] = temp;
    steps.push({ type: 'update', description: `Swapped`, indices: [left, right], extra: { newArray: [...currentArray] } });
    left++;
    right--;
  }
  steps.push({ type: 'info', description: `Reversal complete` });
  return steps;
}

export function rotateLeftStep(arr: number[], k: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const n = arr.length;
  if (n === 0) return steps;
  k = k % n;
  steps.push({ type: 'info', description: `Rotating left by ${k}` });
  
  const currentArray = [...arr];
  
  for (let i = 0; i < k; i++) {
    const first = currentArray[0];
    steps.push({ type: 'visit', description: `Saving first element ${first}`, indices: [0] });
    for (let j = 0; j < n - 1; j++) {
      steps.push({ type: 'shift', description: `Shifting element from index ${j+1} to ${j}`, indices: [j, j+1] });
      currentArray[j] = currentArray[j+1];
      steps.push({ type: 'update', description: `Shifted`, indices: [j], extra: { newArray: [...currentArray] } });
    }
    steps.push({ type: 'insert', description: `Placing ${first} at the end`, indices: [n-1] });
    currentArray[n-1] = first;
    steps.push({ type: 'update', description: `Rotated by 1`, indices: [n-1], extra: { newArray: [...currentArray] } });
  }

  steps.push({ type: 'info', description: `Rotation complete` });
  return steps;
}

export function traverseStep(arr: number[]): AlgoStep[] {
  const steps: AlgoStep[] = [];
  steps.push({ type: 'info', description: `Traversing the array` });
  for (let i = 0; i < arr.length; i++) {
    steps.push({ type: 'visit', description: `Visiting index ${i}, value: ${arr[i]}`, indices: [i] });
  }
  steps.push({ type: 'info', description: `Traversal complete` });
  return steps;
}

export function updateStep(arr: number[], index: number, value: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const currentArray = [...arr];
  steps.push({ type: 'info', description: `Updating index ${index} to ${value}` });
  steps.push({ type: 'highlight', description: `Selecting index ${index}`, indices: [index] });
  currentArray[index] = value;
  steps.push({ type: 'update', description: `Updated index ${index} to ${value}`, indices: [index], extra: { newArray: [...currentArray] } });
  return steps;
}
